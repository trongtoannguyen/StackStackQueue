package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.dto.responce.CommentHistoryResponse;
import com.springboot.app.accounts.dto.responce.MobileMemberResponse;
import com.springboot.app.accounts.dto.responce.MobileUserInfoResponse;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.accounts.service.MobileUserService;
import com.springboot.app.accounts.service.UserHistoryService;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.follows.dto.response.FollowUserResponse;
import com.springboot.app.follows.service.FollowUserService;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MobileUserServiceImpl implements MobileUserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private FollowUserService followUserService;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private UserHistoryService userHistoryService;

	@Override
	public ServiceResponse<List<MobileMemberResponse>> getAllMembers(){
		ServiceResponse<List<MobileMemberResponse>> response = new ServiceResponse<>();
		List<User> users = userRepository.findAll();
		List<MobileMemberResponse> members = users.stream().map(this::toMobileMemberResponse).toList();
		response.setDataObject(members);
		return response;
	}

	@Override
	public ServiceResponse<MobileUserInfoResponse> getMemberByUsername(String username) {
		ServiceResponse<MobileUserInfoResponse> response = new ServiceResponse<>();
		User user = userRepository.findByUsername(username).orElse(null);
		if(user == null){
			response.addMessage("User not found");
			return response;
		}
		MobileUserInfoResponse userInfo = toMobileUserInfoResponse(user);
		response.setDataObject(userInfo);
		return response;
	}

	private MobileUserInfoResponse toMobileUserInfoResponse(User user){
		MobileUserInfoResponse userInfo = new MobileUserInfoResponse();
		userInfo.setUserId(user.getId());
		userInfo.setUsername(user.getUsername());
		userInfo.setName(user.getName());
		userInfo.setAvatar(user.getAvatar());
		userInfo.setImageUrl(user.getImageUrl());

		userInfo.setAddress(user.getPerson().getAddress());
		userInfo.setStatus(user.getAccountStatus());

		userInfo.setBio(user.getPerson().getBio());
		userInfo.setBirthDate(user.getPerson().getBirthDate());
		userInfo.setGender(String.valueOf(user.getPerson().getGender()));

		userInfo.setTotalDiscussions(user.getStat().getDiscussionCount());
		userInfo.setTotalComments(user.getStat().getCommentCount());
		userInfo.setReputation(user.getStat().getReputation());

		ServiceResponse<List<FollowUserResponse>> listFollow = followUserService.getFollowUserByFollowerUsername(user.getUsername());
		long totalFollowers = listFollow.getDataObject().size();
		userInfo.setTotalFollowers(totalFollowers);

		ServiceResponse<List<FollowUserResponse>> listFollowing = followUserService.getFollowUserByFollowingUsername(user.getUsername());
		long totalFollowing = listFollowing.getDataObject().size();
		userInfo.setTotalFollowing(totalFollowing);

		//list comments by username
		List<Comment> comments = commentRepository.findByCreatedBy(user.getUsername());
		if(comments != null && !comments.isEmpty()){
			List<CommentHistoryResponse> commentHistoryResponses = comments.stream()
					.map(item->userHistoryService.mapCommentToCommentHistoryResponse(item)).toList();
			userInfo.setComments(commentHistoryResponses);
		}else {
			userInfo.setComments(new ArrayList<>());
		}
		return userInfo;
	}





	private MobileMemberResponse toMobileMemberResponse(User user){
		MobileMemberResponse member = new MobileMemberResponse();
		member.setUserId(user.getId());
		member.setUsername(user.getUsername());
		member.setName(user.getName());
		member.setAvatar(user.getAvatar());
		member.setImageUrl(user.getImageUrl());

		member.setTotalDiscussions(user.getStat().getDiscussionCount());
		member.setTotalComments(user.getStat().getCommentCount());
		member.setReputation(user.getStat().getReputation());
		return member;
	}

}
