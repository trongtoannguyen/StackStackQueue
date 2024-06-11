package com.springboot.app.forums.repository;

import com.springboot.app.forums.entity.CommentVote;
import com.springboot.app.forums.entity.Vote;
import jakarta.websocket.server.PathParam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentVoteRepository extends JpaRepository<CommentVote, Long>{
}
