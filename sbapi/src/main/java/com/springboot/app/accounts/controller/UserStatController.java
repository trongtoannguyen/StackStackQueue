package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.entity.Badge;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.service.UserService;
import com.springboot.app.accounts.service.UserStatService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort,
			@RequestParam(value="search",defaultValue = "",required = false) String search
	) {
		return ResponseEntity.ok(userStatService.getAllUserStats(page, size, orderBy, sort,search));
	}

	@GetMapping("/avatar/{username}")
	public ResponseEntity<ObjectResponse> getAvatarMember(@PathVariable String username) {
		return ResponseEntity.ok(new ObjectResponse("200","Success user",userService.getAvatarMember(username)));
	}

	@GetMapping("/{username}/comments")
	public ResponseEntity<PaginateResponse> getCommentByUsername(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort,
			@PathVariable String username
	) {
		return ResponseEntity.ok(userStatService.getCommentByUsername(page, size, orderBy, sort,username));
	}

	@GetMapping("/{username}/discussions")
	public ResponseEntity<PaginateResponse> getDiscussionByUsername(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort,
			@PathVariable String username
	) {
		return ResponseEntity.ok(userStatService.getDiscussionByUsername(page, size, orderBy, sort,username));
	}

	@GetMapping("/{username}/personal")
	public ResponseEntity<ObjectResponse> getPersonByUsername(@PathVariable String username) {
		ServiceResponse<Person> response = userStatService.getPersonByUsername(username);
		if (response.getAckCode().equals(AckCodeType.SUCCESS)) {
			return ResponseEntity.ok(new ObjectResponse("200","Success user",response.getDataObject()));
		} else {
			return ResponseEntity.badRequest().body(new ObjectResponse("404","User not found",null));
		}
	}

	@GetMapping("/{username}/badges")
	public ResponseEntity<ServiceResponse<List<Badge>>> getBadgesByUsername(
			@PathVariable String username
	) {
		return ResponseEntity.ok(userStatService.getBadgesByUsername(username));
	}

}
