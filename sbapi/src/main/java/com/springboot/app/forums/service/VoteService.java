package com.springboot.app.forums.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentVote;

import java.time.LocalDateTime;
import java.util.Map;

public interface VoteService {
	ServiceResponse<Void> registerCommentVote(Comment comment, String voteName, Short voteValue);
	ServiceResponse<Map<String,Long>> getReputation4AllUsers();
	ServiceResponse<Map<String,Integer>> getMostReputationUsers(LocalDateTime sinceDate, Integer limit);

}
