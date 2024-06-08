package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.service.UserHistoryService;
import com.springboot.app.dto.response.PaginateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-history")
public class UserHistoryController {

	@Autowired
	private UserHistoryService userHistoryService;

	@GetMapping("/{username}/comments")
	public ResponseEntity<PaginateResponse> getCommentsByUsername(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort,
			@PathVariable String username
	){
		return ResponseEntity.ok(userHistoryService.getAllCommentsByUsername(page, size, orderBy, sort,username));
	}

	@GetMapping("/{username}/discussions")
	public ResponseEntity<PaginateResponse> getDiscussionsByUsername(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort,
			@PathVariable String username
	){
		return null;
	}

}
