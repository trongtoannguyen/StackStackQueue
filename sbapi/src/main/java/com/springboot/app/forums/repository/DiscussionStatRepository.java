package com.springboot.app.forums.repository;

import com.springboot.app.forums.entity.DiscussionStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscussionStatRepository extends JpaRepository<DiscussionStat, Long> {
}
