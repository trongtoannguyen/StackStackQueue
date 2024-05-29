package com.springboot.app.forums.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.Forum;

@Repository("discussionRepository")
public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
	@Modifying
	@Query("UPDATE Discussion d SET d.forum = :toForum WHERE d.forum = :fromForum")
	Integer moveDiscussion(Forum fromForum, Forum toForum);

	@Modifying
	@Query("SELECT d.stat.lastComment FROM Discussion d WHERE d.forum = :forum ORDER BY d.stat.lastComment.commentDate DESC")
	CommentInfo latestCommentInfo(Forum forum);

	// query Discussion by forumId
	@Query("SELECT d FROM Discussion d WHERE d.forum.id = :id")
	List<Discussion> findDiscussionByForumId(@Param("id") Long id);

}