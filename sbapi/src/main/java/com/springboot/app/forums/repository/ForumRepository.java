package com.springboot.app.forums.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.springboot.app.forums.entity.Forum;

@Repository("forumRepository")
public interface ForumRepository extends JpaRepository<Forum, Long> {
	// select forum by id = foundGroup id
	@Query("SELECT f FROM Forum f WHERE f.forumGroup.id = :id")
	List<Forum> findForumByForumGroupId(@Param("id") Long id);

	@Query("SELECT MAX(fg.sortOrder) FROM ForumGroup fg")
	Integer findTopBySortOrder();

	// findTopbySortOrder by id for Forum
	@Query("SELECT MAX(fg.sortOrder) FROM Forum fg WHERE fg.forumGroup.id = :id")
	Integer findTopBySortOrderForForum(@Param("id") Long id);

	@Modifying
	@Query("SELECT COUNT(f) FROM Forum f")
	Integer countForums();
}
