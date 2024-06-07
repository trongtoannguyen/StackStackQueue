package com.springboot.app.forums.service.impl;

import com.springboot.app.accounts.entity.PasswordReset;
import com.springboot.app.accounts.entity.UserStat;
import com.springboot.app.accounts.repository.UserStatRepository;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentVote;
import com.springboot.app.forums.entity.Vote;
import com.springboot.app.forums.repository.CommentVoteRepository;
import com.springboot.app.forums.repository.VoteRepository;
import com.springboot.app.forums.service.VoteService;
import com.springboot.app.repository.GenericDAO;
import com.springboot.app.repository.StatDAO;
import com.springboot.app.repository.VoteDAO;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@Service
public class VoteServiceImpl implements VoteService {
	@Autowired
	private VoteRepository voteRepository;

	@Autowired
	private CommentVoteRepository commentVoteRepository;
	@Autowired
	private UserStatRepository userStatRepository;

	@Autowired
	private VoteDAO voteDAO;

	@Autowired
	private StatDAO statDAO;

	@Transactional(readOnly = false)
	public ServiceResponse<Void> registerCommentVote(Comment comment,String voteName, Short voteValue) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		CommentVote commentVote = comment.getCommentVote();
		Vote vote = voteDAO.getVote(commentVote, voteName);

		if(vote == null) {
			vote = new Vote();
			vote.setVoterName(voteName);
			vote.setVoteValue(voteValue);
			voteRepository.save(vote);

			//update commentVote
			commentVote.getVotes().add(vote);
			if(voteValue == 1) {
				commentVote.setVoteDownCount(commentVote.getVoteUpCount() + 1);
			}
			else if(voteValue == -1) {
				commentVote.setVoteDownCount(commentVote.getVoteDownCount() + 1);
			}
			commentVoteRepository.save(commentVote);

			addReputationAfterVote(comment, voteValue);

			response.addMessage("Vote on comment registered successfully for voter " + voteName);
		}
		else {
			response.addMessage("Voter already voted on the comment");
			response.setAckCode(AckCodeType.FAILURE);
		}
		return response;
	}

	@Transactional(readOnly = false)
	public ServiceResponse<Map<String,Long>> getReputation4AllUsers() {
		ServiceResponse<Map<String,Long>> response = new ServiceResponse<>();
		response.setDataObject(voteDAO.getReputation4AllUsers());
		return response;
	}

	@Transactional(readOnly = false)
	public ServiceResponse<Map<String,Integer>> getMostReputationUsers(LocalDateTime sinceDate, Integer limit) {
		ServiceResponse<Map<String,Integer>> response = new ServiceResponse<>();
		response.setDataObject(voteDAO.getTopReputationUsers(sinceDate, limit));
		return response;
	}


	public void addReputationAfterVote(Comment comment, short voteValue) {
		String username = comment.getCreatedBy();
		UserStat stat = statDAO.getUserStat(username);
		stat.addReputation(voteValue);
		userStatRepository.save(stat);
	}
}
