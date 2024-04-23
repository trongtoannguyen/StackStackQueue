package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.service.UserService;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.security.dto.request.SignupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping("")
	public ResponseEntity<PaginateResponse> getUsers(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size",defaultValue = "10",required = false) int size,
			@RequestParam(value="orderBy",defaultValue = "id",required = false) String orderBy,
			@RequestParam(value="sort",defaultValue = "ASC",required = false) String sort
	) {
		return ResponseEntity.ok(userService.getAllUsers(page, size, orderBy, sort));
	}

	@GetMapping("/{id}")
	public ResponseEntity<ObjectResponse> getUserById(@PathVariable Long id) {
		User user = userService.findById(id).orElse(null);
		if (user == null) {
			return ResponseEntity.ok(new ObjectResponse("404","User not found",null));
		}
		return ResponseEntity.ok(new ObjectResponse("200","Success user",userService.findById(id)));
	}

	@PostMapping("create")
	public ResponseEntity<ObjectResponse> createUser(@RequestBody SignupRequest signupRequest) {
		User user = userService.save(signupRequest);
		if (user == null) {
			return ResponseEntity.ok(new ObjectResponse("400","User not created",null));
		}
		return ResponseEntity.ok(new ObjectResponse("201","User created",user));
	}
}
