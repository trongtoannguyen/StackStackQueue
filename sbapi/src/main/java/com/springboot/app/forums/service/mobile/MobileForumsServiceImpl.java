package com.springboot.app.forums.service.mobile;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.response.MobileGroupResponse;
import com.springboot.app.forums.dto.response.MobileDiscussionResponse;
import com.springboot.app.forums.dto.response.MobileForumResponse;
import com.springboot.app.forums.dto.response.ViewCommentResponse;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.forums.repository.ForumGroupRepository;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MobileForumsServiceImpl implements MobileForumsService{

	@Autowired
	private ForumRepository forumRepository;
	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private CommentService commentService;

	@Autowired
	private ForumGroupRepository forumGroupRepository;

	@Override
	public ServiceResponse<List<MobileGroupResponse>> getAllForumGroups() {
		ServiceResponse<List<MobileGroupResponse>> response = new ServiceResponse<>();
		List<MobileGroupResponse> forumGroups = forumGroupRepository.findAll()
				.stream().map(this::mapForumGroupToForumsGroupResponse).toList();
		response.setDataObject(forumGroups);
		return response;
	}

	@Override
	public ServiceResponse<List<MobileForumResponse>> getAllForumByAllGroup() {
		ServiceResponse<List<MobileForumResponse>> response = new ServiceResponse<>();
		List<Forum> forums = forumRepository.findAll();
		List<MobileForumResponse> mobileForumResponses = forums.stream()
				.map(this::mapForumToMobileForumResponse).toList();
		response.setDataObject(mobileForumResponses);
		return response;
	}

	//find list of forums
	@Override
	public ServiceResponse<List<MobileForumResponse>> getAllForumsByGroupId(Long groupId) {
		ServiceResponse<List<MobileForumResponse>> response = new ServiceResponse<>();

		//find forums by group id
		List<Forum> forums = forumRepository.findForumsByGroupId(groupId);
		if (forums == null || forums.isEmpty()) {
			response.addMessage("Forums not found");
			return response;
		}
		//map forums to response
		List<MobileForumResponse> mobileForumResponses = forums.stream()
				.map(this::mapForumToMobileForumResponse).toList();
		response.setDataObject(mobileForumResponses);

		return response;
	}

	@Override
	public ServiceResponse<List<ViewCommentResponse>> getAllCommentByDiscussionId(Long id) {
		ServiceResponse<List<ViewCommentResponse>> response = new ServiceResponse<>();
		Discussion discussion = discussionRepository.findById(id).orElse(null);
		if(discussion == null) {
			response.addMessage("Discussion not found");
			return response;
		}
		List<Comment> comments = discussion.getComments();
		if(comments == null || comments.isEmpty()) {
			response.addMessage("Comments not found");
			return response;
		}
		List<ViewCommentResponse> viewCommentResponses = comments.stream()
				.map(commentService::mapCommentToViewCommentResponse).toList();
		response.setDataObject(viewCommentResponses);

		return response;
	}

	@Override
	public ServiceResponse<byte[]> getContentByCommentId(Long id) {
		ServiceResponse<byte[]> response = new ServiceResponse<byte[]>();
		String content = commentService.getContentByCommentId(id);
		if(content != null) {
			response.setDataObject(content.getBytes());
			return response;
		}
		return null;
	}

	private MobileGroupResponse mapForumGroupToForumsGroupResponse(ForumGroup forumGroup) {
		MobileGroupResponse forumsGroupResponse = new MobileGroupResponse();
		forumsGroupResponse.setId(forumGroup.getId());
		forumsGroupResponse.setTitle(forumGroup.getTitle());
		forumsGroupResponse.setColor(forumGroup.getColor());
		return forumsGroupResponse;
	}

	private MobileForumResponse mapForumToMobileForumResponse(Forum forum) {
		MobileForumResponse mobileForumResponse = new MobileForumResponse();
		mobileForumResponse.setId(forum.getId());
		mobileForumResponse.setTitle(forum.getTitle());
		//discussion
		List<Discussion> discussions = forum.getDiscussions();
		if(discussions == null || discussions.isEmpty()) {
			return mobileForumResponse;
		}
		List<MobileDiscussionResponse> mobileDiscussionResponses = discussions.stream()
				.map(this::mapDiscussionToMobileDiscussionResponse).toList();
		mobileForumResponse.setDiscussions(mobileDiscussionResponses);
		//total comments
		int totalComments = discussions.stream().mapToInt(d -> d.getComments().size()).sum();
		mobileForumResponse.setTotalComments(totalComments);

		return mobileForumResponse;
	}

	private MobileDiscussionResponse mapDiscussionToMobileDiscussionResponse(Discussion discussion) {
		MobileDiscussionResponse mobileDiscussionResponse = new MobileDiscussionResponse();
		mobileDiscussionResponse.setDiscussionId(discussion.getId());
		mobileDiscussionResponse.setDiscussionTitle(discussion.getTitle());
		mobileDiscussionResponse.setCreatedAt(discussion.getCreatedAt());

		//author
		User author = userRepository.findByUsername(discussion.getCreatedBy()).orElse(null);
		if(author != null) {
			mobileDiscussionResponse.setUsername(author.getUsername());
			mobileDiscussionResponse.setName(author.getName());
			mobileDiscussionResponse.setAvatar(author.getAvatar());
			mobileDiscussionResponse.setImageUrl(author.getImageUrl());
		}

		return mobileDiscussionResponse;
	}
}
