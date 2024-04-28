package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.service.UserService;
import com.springboot.app.dto.response.ObjectResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account-info")
public class AccountInfoController {

	private static final Logger logger = LoggerFactory.getLogger(AccountInfoController.class);

	@Autowired
	private UserService userService;

	@GetMapping("/{id}")
	public ResponseEntity<ObjectResponse> getAccountInfo(@PathVariable Long id) {
		User user = userService.findById(id).orElse(null);
		if (user == null) {
			return ResponseEntity.ok(new ObjectResponse("404", "User not found", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Success user", user));
	}

	@PostMapping("/update-info")
	public ResponseEntity<?> updatePersonInfo(@RequestBody User user) {
		return ResponseEntity.ok("Account Info Updated");
	}

	@PostMapping("/update-password")
	public ResponseEntity<?> updatePassword() {
		return ResponseEntity.ok("Account Info Deleted");
	}

}
