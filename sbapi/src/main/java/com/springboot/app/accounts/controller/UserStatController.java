package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.service.UserService;
import com.springboot.app.accounts.service.UserStatService;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.PaginateResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user-stat")
public class UserStatController {
	private static final Logger logger = LoggerFactory.getLogger(UserStatController.class);

	@Autowired
	private UserStatService userStatService;

	@Autowired
	private UserService userService;

	@GetMapping("")
	public ResponseEntity<PaginateResponse> getUserStats(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort
	) {
		return ResponseEntity.ok(userStatService.getAllUserStats(page, size, orderBy, sort));
	}

	@GetMapping("/avatar/{username}")
	public ResponseEntity<ObjectResponse> getAvatarMember(@PathVariable String username) {
		return ResponseEntity.ok(new ObjectResponse("200","Success user",userService.getAvatarMember(username)));
	}

}
