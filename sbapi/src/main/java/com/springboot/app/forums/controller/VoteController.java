package com.springboot.app.forums.controller;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.service.VoteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vote")
public class VoteController {

	@Autowired
	private VoteService voteService;

	@PostMapping("/vote-up")
	public ResponseEntity<ObjectResponse> voteUp(@Valid @RequestBody Comment comment) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if(username.equals("anonymousUser")) {
			return ResponseEntity.badRequest().body(new ObjectResponse("400","Must login to vote",null));
		}
		ServiceResponse<Void> response = voteService.registerCommentVote(comment.getCommentVote(),username, (short)1);

		if(response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok().body(new ObjectResponse("200","Vote registered",null));
		}
		else {
			return ResponseEntity.badRequest().body(new ObjectResponse("400","Error: Vote could not be registered",null));
		}
	}

	@PostMapping("/vote-down")
	public ResponseEntity<ObjectResponse> voteDown(@Valid @RequestBody Comment comment) {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		if(username.equals("anonymousUser")) {
			return ResponseEntity.badRequest().body(new ObjectResponse("400","Must login to vote",null));
		}
		ServiceResponse<Void> response = voteService.registerCommentVote(comment.getCommentVote(),username, (short)-1);

		if(response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok().body(new ObjectResponse("200","Vote registered",null));
		}
		else {
			return ResponseEntity.badRequest().body(new ObjectResponse("400","Error: Vote could not be registered",null));
		}
	}

}
