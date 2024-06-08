package com.springboot.app.admin.service;

import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.repository.ForumStatRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService{
	private static final Logger logger = LoggerFactory.getLogger(AdminDashboardServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private ForumStatRepository forumStatRepository;


	@Override
	public ServiceResponse<Number> countUsers() {
		ServiceResponse<Number> response = new ServiceResponse<>();
		response.setAckCode(AckCodeType.SUCCESS);
		response.setDataObject(userRepository.count());
		return response;
	}

	@Override
	public ServiceResponse<Number> countForums() {
		ServiceResponse<Number> response = new ServiceResponse<>();
		response.setAckCode(AckCodeType.SUCCESS);
		response.setDataObject(forumRepository.count());
		return response;
	}

	@Override
	public ServiceResponse<Number> countDiscussions() {
		ServiceResponse<Number> response = new ServiceResponse<>();
		response.setAckCode(AckCodeType.SUCCESS);
		response.setDataObject(discussionRepository.count());
		return response;

	}

	@Override
	public ServiceResponse<Number> countComments() {
		ServiceResponse<Number> response = new ServiceResponse<>();
		response.setAckCode(AckCodeType.SUCCESS);
		response.setDataObject(commentRepository.count());
		return response;
	}

	//data for chart in dashboard page for admin to see how many users are in each forum
	@Override
	public ServiceResponse<Map<String, Integer>> countUsersByForum() {
		return null;
	}

	@Override
	public ServiceResponse<Map<String, Integer>> countDiscussionsByForum() {

		return null;
	}

	@Override
	public ServiceResponse<Map<String, Integer>> countCommentsByForum() {
		Map<String, Integer> commentCountByForum = new HashMap<>();
		return null;
	}


}
