package com.springboot.app.repository;

import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.tags.Tag;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DiscussionDAO {
	@PersistenceContext
	protected EntityManager entityManager;

	public List<Discussion> findByTag(Tag tag,Integer startPosition,Integer endPosition,String sortField,Boolean descending){
		String queryStr = "FROM Discussion d WHERE :tag MEMBER OF d.tags";
		if(sortField != null && descending != null) {
			queryStr += " ORDER BY d." + sortField + (descending ? " DESC" : " ASC");
		}
		else {
			queryStr += " ORDER BY d.id DESC";
		}

		TypedQuery<Discussion> typedQuery = entityManager.createQuery(queryStr, Discussion.class);
		typedQuery.setParameter("tag", tag);

		if(startPosition != null) {
			typedQuery.setFirstResult(startPosition);
		}
		if(endPosition != null) {
			typedQuery.setMaxResults(endPosition);
		}

		return typedQuery.getResultList();
	}

	public Number countCommentsForTag(Long tagId) {
		String nativeQuery = "SELECT COUNT(1) FROM Comment c" +
				" LEFT JOIN discussion_tags dt ON dt.discussion_id = c.discussion_id" +
				" WHERE dt.tag_id = ?1";
		Query query = entityManager.createNativeQuery(nativeQuery).setParameter(1, tagId);
		return (Number) query.getSingleResult();
	}

	public CommentInfo getLatestCommentInfoForTag(Tag tag) {
		String queryStr = "SELECT d.stat.lastComment FROM Discussion d" +
				" WHERE :tag MEMBER OF d.tags" +
				" ORDER BY d.stat.lastComment.id DESC";
		TypedQuery<CommentInfo> query = entityManager.createQuery(queryStr, CommentInfo.class);
		query.setParameter("tag", tag);
		query.setMaxResults(1);
		List<CommentInfo> results = query.getResultList();
		return results.isEmpty() ? null : results.getFirst();
	}

	public Number countDiscussionsForTag(Tag tag) {
		String queryStr = "SELECT COUNT(d) FROM Discussion d WHERE :tag MEMBER OF d.tags";
		TypedQuery<Number> query = entityManager.createQuery(queryStr, Number.class);
		query.setParameter("tag", tag);
		return query.getSingleResult();
	}

	public List<Discussion> getLatestDiscussions(Integer maxResult) {
		String queryStr = "FROM Discussion d ORDER BY d.id DESC";
		TypedQuery<Discussion> query = entityManager.createQuery(queryStr, Discussion.class);
		if(maxResult != null) {
			query.setMaxResults(maxResult);
		}
		return query.getResultList();
	}

	public List<Discussion> getMostViewsDiscussions(LocalDateTime since, Integer maxResult) {
		String queryStr = "FROM Discussion d WHERE d.createdAt>=:since ORDER BY d.stat.viewCount DESC";
		TypedQuery<Discussion> query = entityManager.createQuery(queryStr, Discussion.class);
		query.setParameter("since", since);

		if(maxResult != null) {
			query.setMaxResults(maxResult);
		}
		return query.getResultList();
	}

	public List<Discussion> getMostCommentsDiscussions(LocalDateTime since, Integer maxResult) {
		String queryStr = "FROM Discussion d WHERE d.createdAt>=:since ORDER BY d.stat.commentCount DESC";
		TypedQuery<Discussion> query = entityManager.createQuery(queryStr, Discussion.class);
		query.setParameter("since", since);

		if(maxResult != null) {
			query.setMaxResults(maxResult);
		}
		return query.getResultList();
	}

	public Map<String, Integer> getMostDiscussionUsers(LocalDateTime since, Integer maxResult) {
		Map<String, Integer> commentors = new HashMap<>();
		Query query = entityManager.createQuery("SELECT d.createdBy username, count(d) discussionCount FROM Discussion d " +
				"WHERE d.createdAt>=:since " +
				"GROUP BY username " +
				"ORDER BY discussionCount DESC");
		query.setParameter("since", since);
		query.setMaxResults(maxResult);
		@SuppressWarnings("unchecked")
		List<Object[]> resultList = query.getResultList();
		for (Object[] objectArray : resultList) {
			commentors.put((String) objectArray[0], ((Number) objectArray[1]).intValue());
		}
		return commentors;
	}

}
