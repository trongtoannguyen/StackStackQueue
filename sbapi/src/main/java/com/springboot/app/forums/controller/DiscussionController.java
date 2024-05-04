package com.springboot.app.forums.controller;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.AddDiscussionRequest;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.*;
import com.springboot.app.forums.service.DiscussionService;
import com.springboot.app.security.jwt.JwtUtils;
import com.springboot.app.service.GenericService;
import com.springboot.app.service.SystemConfigService;
import com.springboot.app.utils.JSFUtils;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;

@RestController
@RequestMapping("/api/discussions")
public class DiscussionController {

	private static final Logger logger = LoggerFactory.getLogger(DiscussionController.class);

	@Autowired
	private DiscussionService discussionService;
	@Autowired
	private GenericService genericService;

	@Autowired
	private SystemConfigService systemConfigService;

	@PostMapping("/add")
	public ResponseEntity<ObjectResponse> addDiscussion(@Valid @RequestBody AddDiscussionRequest newDiscussion){
		Forum forum = genericService.getEntity(Forum.class, newDiscussion.getForumId()).getDataObject();
		if(forum == null){
			return ResponseEntity.ok(new ObjectResponse(
					"404",
					String.format("Forum with id %d not found", newDiscussion.getForumId()),
					null));
		}
		if(!forum.isActive()){
			return ResponseEntity.ok(new ObjectResponse(
					"400",
					String.format("Forum %s is not active", forum.getTitle()),
					null));
		}
//		CommentOption commentOption = systemConfigService.getCommentOption().getDataObject();
		String username = null;
		try{
			var userSession = JwtUtils.getSession();
			username = userSession.getUsername();
		}catch(Exception e){
			logger.error("Error getting user session: {}", e.getMessage());
		}


		Discussion discussion = newDiscussion.getDiscussion();
		discussion.setStat(new DiscussionStat());
		discussion.setForum(forum);

		forum.getDiscussions().add(discussion);
		Comment comment = new Comment();
		comment.setContent(newDiscussion.getContent());

		comment.setIpAddress(JSFUtils.getRemoteIPAddress());

		//note: uploaded files are not supported, so we pass empty lists
		ServiceResponse<Discussion> response = discussionService.addDiscussion(
				discussion,
				comment,
				username,
				Collections.emptyList(),
				Collections.emptyList()
		);

		if(response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse(
					"201",
					String.format("Created Discussion %s successfully", discussion.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse(
				"400",
				String.format("Could not create Discussion: %s", discussion.getTitle()),
				null));
	}
}
