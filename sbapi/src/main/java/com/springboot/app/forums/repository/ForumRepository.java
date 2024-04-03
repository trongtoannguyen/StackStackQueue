package com.springboot.app.forums.repository;

import com.springboot.app.forums.entity.Forum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("forumRepository")
public interface ForumRepository extends JpaRepository<Forum, Long> {
}
