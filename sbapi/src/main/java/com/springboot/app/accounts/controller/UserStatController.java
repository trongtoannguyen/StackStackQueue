package com.springboot.app.accounts.controller;

import com.springboot.app.bagdes.Badge;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.service.PersonService;
import com.springboot.app.accounts.service.StorageService;
import com.springboot.app.accounts.service.UserService;
import com.springboot.app.accounts.service.UserStatService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

	@Autowired
	private StorageService storageService;
	@Autowired
	private PersonService personService;

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

	@GetMapping("/members")
	public ResponseEntity<PaginateResponse> getUserStatsWithIgnoreAdmin(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort,
			@RequestParam(value="search",defaultValue = "",required = false) String search
	) {
		return ResponseEntity.ok(userStatService.getAllUserStatsWithIgnoreAdmin(page, size, orderBy, sort,search));
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

	/*
	 * Read the image file from the storage and send it as a response to the client
	 */
	@GetMapping("/images/{filename:.+}")
	public ResponseEntity<byte[]> readDetailFile(@PathVariable String filename) {
		try {
			byte[] fileBytes = storageService.readFileContent(filename);
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(fileBytes);
		} catch (Exception e) {
			return ResponseEntity.noContent().build();
		}
	}

	@GetMapping("/images/avatar/{username}")
	public ResponseEntity<?> readAvatarByUsername(@PathVariable String username) {
		User user = userService.findByUsername(username).orElse(null);
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
		}
		String filename = user.getAvatar();
		if (filename == null) {
			if(user.getImageUrl()!=null){
				return ResponseEntity.ok().body(user.getImageUrl());
			}
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No avatar found");
		}
		try {
			byte[] fileBytes = storageService.readFileContent(filename);
			return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(fileBytes);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}

	}

	@GetMapping("/images/avatar-name/{username}")
	public ResponseEntity<ObjectResponse> readAvatarNameByUsername(@PathVariable String username) {
		ServiceResponse<String> response = personService.getAvatarByUsername(username);
		if (response.getAckCode().equals(AckCodeType.SUCCESS)) {
			return ResponseEntity.ok(new ObjectResponse("200","Success user",response.getDataObject()));
		} else {
			return ResponseEntity.notFound().build(); //404
		}
	}

}
