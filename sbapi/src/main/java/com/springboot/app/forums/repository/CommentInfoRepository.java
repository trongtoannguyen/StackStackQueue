package com.springboot.app.forums.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springboot.app.forums.entity.CommentInfo;

@Repository
public interface CommentInfoRepository extends JpaRepository<CommentInfo, Long> {

}
