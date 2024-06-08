package com.springboot.app.repository;


import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class CommentDAO {

	@PersistenceContext
	protected EntityManager entityManager;

	public List<String> getCommentorsForDiscussion(Discussion discussion) {

		String queryStr = "SELECT DISTINCT c.createdBy FROM Comment c WHERE c.discussion = :discussion";

		TypedQuery<String> typedQuery = entityManager.createQuery(queryStr, String.class);
		typedQuery.setParameter("discussion", discussion);

		return typedQuery.getResultList();
	}

	public List<String> getAttachmentPathsForDiscussion(Discussion discussion) {

		String queryStr = "SELECT f.path FROM FileInfo f, Comment c WHERE f MEMBER OF c.attachments and c.discussion = :discussion";

		TypedQuery<String> typedQuery = entityManager.createQuery(queryStr, String.class);
		typedQuery.setParameter("discussion", discussion);

		return typedQuery.getResultList();
	}

	public List<String> getThumbnailPathsForDiscussion(Discussion discussion) {

		String queryStr = "SELECT f.path FROM FileInfo f, Comment c WHERE f MEMBER OF c.thumbnails and c.discussion = :discussion";

		TypedQuery<String> typedQuery = entityManager.createQuery(queryStr, String.class);
		typedQuery.setParameter("discussion", discussion);

		return typedQuery.getResultList();
	}

	public int deleteCommentsForDiscussion(Discussion discussion) {

		String queryStr = "DELETE FROM Comment c WHERE c.discussion = :discussion";

		return entityManager.createQuery(queryStr).setParameter("discussion", discussion).executeUpdate();
	}

	public List<Comment> getLatestCommentsForUser(String username, int maxResult) {

		String queryStr = "SELECT c FROM Comment c WHERE c.createdBy = :username ORDER BY c.id DESC";
		TypedQuery<Comment> typedQuery = entityManager.createQuery(queryStr, Comment.class);
		typedQuery.setParameter("username", username);
		typedQuery.setMaxResults(maxResult);

		return typedQuery.getResultList();
	}

	public Map<String, Integer> getMostCommentsUsers(Date since, Integer maxResult) {

		Map<String, Integer> users = new HashMap<>();

		Query query = entityManager.createQuery("SELECT c.createdBy username, count(c) commentCount FROM Comment c WHERE c.createdAt >= :since"
				+ " GROUP BY username ORDER BY commentCount DESC");
		query.setParameter("since", since);

		query.setMaxResults(maxResult);

		@SuppressWarnings("unchecked")
		List<Object[]> resultList = query.getResultList();

		for(Object[] objectArray : resultList) {
			users.put((String)objectArray[0], ((Number)objectArray[1]).intValue());
		}

		return users;
	}

	/**
	 * This method is useful for determining if the comment is the first in the discussion
	 */
	public Boolean isFirstComment(Comment comment) {

		String nativeQuery = "SELECT MIN(C.ID) FROM COMMENT_T C WHERE C.DISCUSSION_ID = ?1";

		Query query = entityManager.createNativeQuery(nativeQuery).setParameter(1, comment.getDiscussion().getId());

		return ((Number)query.getSingleResult()).longValue() == comment.getId();
	}
}
