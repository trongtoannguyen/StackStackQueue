package com.springboot.app.admin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

	private static final Logger logger = LoggerFactory.getLogger(AdminDashboardController.class);

	@RequestMapping("/users/count")
	public ResponseEntity<Number> getCountUsers() {
		return ResponseEntity.ok(0);
	}

	@RequestMapping("/forums/count")
	public ResponseEntity<Number> getCountForums() {
		return ResponseEntity.ok(0);
	}

	@RequestMapping("/discussions/count")
	public ResponseEntity<Number> getCountDiscussions() {
		return ResponseEntity.ok(0);
	}

	@RequestMapping("/comments/count")
	public ResponseEntity<Number> getCountComments() {
		return ResponseEntity.ok(0);
	}
}
