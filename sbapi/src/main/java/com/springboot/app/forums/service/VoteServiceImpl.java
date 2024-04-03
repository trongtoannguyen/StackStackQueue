package com.springboot.app.forums.service;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.CommentVote;
import com.springboot.app.forums.entity.Vote;
import com.springboot.app.forums.repository.CommentVoteRepository;
import com.springboot.app.forums.repository.VoteRepository;
import com.springboot.app.repository.VoteDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;

@Service
public class VoteServiceImpl implements VoteService{
	@Autowired
	private VoteRepository voteRepository;

	@Autowired
	private CommentVoteRepository commentVoteRepository;


	@Autowired
	private VoteDAO voteDAO;

	@Transactional(readOnly = false)
	public ServiceResponse<Void> registerCommentVote(CommentVote commentVote,String voteName, Short voteValue) {
		ServiceResponse<Void> response = new ServiceResponse<>();
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
}
