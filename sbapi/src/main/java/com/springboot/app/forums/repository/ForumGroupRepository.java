package com.springboot.app.forums.repository;

import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("forumGroupRepository")
public interface ForumGroupRepository extends JpaRepository<ForumGroup, Long> {

	@Modifying
	@Query("UPDATE Discussion d SET d.forum = :toForum WHERE d.forum = :fromForum")
	Integer moveDiscussions(@Param("fromForum") Forum fromForum, @Param("toForum") Forum toForum);

	@Modifying
	@Query("SELECT COUNT(f) FROM Forum f")
	Integer countForums();
}
