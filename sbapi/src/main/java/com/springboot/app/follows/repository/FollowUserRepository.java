package com.springboot.app.follows.repository;

import com.springboot.app.follows.entity.FollowUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FollowUserRepository extends JpaRepository<FollowUser, Long>, PagingAndSortingRepository<FollowUser, Long> {
	@Modifying
	@Query("DELETE FROM FollowUser f WHERE f.followerUser.id = :userId OR f.followingUser.id = :userId")
	void deleteBy(@Param("userId") Long userId);

}
