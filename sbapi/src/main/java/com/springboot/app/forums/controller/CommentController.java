package com.springboot.app.forums.controller;

import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.AddCommentRequest;
import com.springboot.app.forums.dto.CommentDTO;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.service.CommentService;
import com.springboot.app.forums.service.DiscussionService;
import com.springboot.app.security.jwt.JwtUtils;
import com.springboot.app.service.GenericService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

	@Autowired
	private DiscussionService discussionService;

	@Autowired
	private GenericService genericService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private CommentService commentService;

	@PostMapping("/add")
	public ResponseEntity<ObjectResponse> addComment(@Valid @RequestBody AddCommentRequest newComment) {
		Discussion discussion = genericService.getEntity(Discussion.class, newComment.getDiscussionId())
				.getDataObject();
		if (discussion == null) {
			return ResponseEntity.ok(new ObjectResponse("404",
					String.format("Discussion with id %s not found", newComment.getDiscussionId()), null));
		}
		String username = null;
		try {
			var userSession = JwtUtils.getSession();
			username = userSession.getUsername();
			System.out.println("8---------------------------------------");
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}
		System.out.println("8---------------------------------------");
		ServiceResponse<Comment> response = commentService.addComment(discussion.getId(), newComment.getComment(),
				username, Collections.emptyList(), Collections.emptyList());
		System.out.println("9---------------------------------------");
		CommentDTO commentDTO = modelMapper.map(response.getDataObject(), CommentDTO.class);
		System.out.println("10---------------------------------------");
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("201",
					String.format("Added comment %s successfully", newComment.getComment().getContent()), commentDTO));
		}

		return ResponseEntity.ok(new ObjectResponse("400",
				String.format("Could not add comment: %s", newComment.getComment().getContent()), null));
	}

}
