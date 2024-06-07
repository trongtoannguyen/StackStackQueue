package com.springboot.app.admin.controller;

import com.springboot.app.admin.service.AdminDashboardService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

	private static final Logger logger = LoggerFactory.getLogger(AdminDashboardController.class);
	@Autowired
	private AdminDashboardService adminDashboardService;

	@RequestMapping("/users/count")
	public ResponseEntity<Number> getCountUsers() {
		ServiceResponse<Number> response = adminDashboardService.countUsers();
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(response.getDataObject());
		}
		return ResponseEntity.ok(0);
	}

	@RequestMapping("/forums/count")
	public ResponseEntity<Number> getCountForums() {
		ServiceResponse<Number> response = adminDashboardService.countForums();
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(response.getDataObject());
		}
		return ResponseEntity.ok(0);
	}

	@RequestMapping("/discussions/count")
	public ResponseEntity<Number> getCountDiscussions() {
		ServiceResponse<Number> response = adminDashboardService.countDiscussions();
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(response.getDataObject());
		}
		return ResponseEntity.ok(0);
	}

	@RequestMapping("/comments/count")
	public ResponseEntity<Number> getCountComments() {
		ServiceResponse<Number> response = adminDashboardService.countComments();
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(response.getDataObject());
		}
		return ResponseEntity.ok(0);
	}

	//data for chart in dashboard page
	// user count by forum
	public ResponseEntity<ObjectResponse> getCountUsersByForum() {
		ServiceResponse<Map<String,Number>> response = adminDashboardService.countUsersByForum();
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("200", "Success", response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("404", "Not found", null));
	}


	// user count by discussion
	// user count by comment
	// discussion count by forum
	// comment count by discussion

}
