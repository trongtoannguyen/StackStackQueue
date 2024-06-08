package com.springboot.app.forums.repository;

import com.springboot.app.forums.entity.ForumStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository("forumStatRepository")
public interface ForumStatRepository extends JpaRepository<ForumStat, Long> {
}
