package com.springboot.app.follows.repository;

import com.springboot.app.follows.entity.FollowUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowUserReposiroty extends JpaRepository<FollowUser, Long>, PagingAndSortingRepository<FollowUser, Long> {
}
