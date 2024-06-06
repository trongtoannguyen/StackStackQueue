package com.springboot.app.forums.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.Forum;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>, PagingAndSortingRepository<Comment, Long> {
	@Modifying
	@Transactional
	@Query("SELECT COUNT(c) FROM Comment c WHERE c.discussion.forum = :forum")
	Number countComment(@Param("forum") Forum forum);

	@Modifying
	@Transactional
	@Query("SELECT c FROM Comment c WHERE c.discussion.forum = :forum ORDER BY c.id DESC")
	Comment findLatestComment(@Param("forum") Forum forum);

	@Modifying
	@Transactional
	@Query("SELECT COUNT(c) FROM Comment c WHERE c.discussion = :discussion")
	Number countCommentByDiscussion(Discussion discussion);

	// query Comment by discussion title
	@Query("SELECT c FROM Comment c WHERE c.discussion.title = :title")
	Comment findCommentByDiscussionTitle(@Param("title") String title);

	@Query("SELECT c FROM Comment c WHERE (:username IS NULL OR :username = '' OR c.createdBy LIKE :username)")
	Page<Comment> findAllByUsername(@Param("username") String username, Pageable pageable);

}
