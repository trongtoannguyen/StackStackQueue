
package com.springboot.app.forums.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.DiscussionDTO;
import com.springboot.app.forums.service.DiscussionService;

@RestController
@RequestMapping("/api/view/discussions")
public class DicussionViewController {

	private static final Logger logger = LoggerFactory.getLogger(DicussionViewController.class);

	@Autowired
	private DiscussionService discussionService;

	@GetMapping("/byId/{id}")
	public ResponseEntity<ObjectResponse> getDiscussionById(@PathVariable Long id) {
		ServiceResponse<DiscussionDTO> response = discussionService.getById(id);
		if (response.getDataObject() != null && response.getDataObject().getId() != null) {
			return ResponseEntity.ok(new ObjectResponse("200", "Discussion found", response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("404", "Discussion not found", null));
	}

	@GetMapping("/byFourm/{id}")
	public ResponseEntity<ObjectResponse> getDiscussionsByForum(Long id) {
		ServiceResponse<List<DiscussionDTO>> response = discussionService.getDiscussionsByForum(id);
		if (response.getDataObject() != null && !response.getDataObject().isEmpty()) {
			return ResponseEntity.ok(new ObjectResponse("200", "Discussions found", response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("404", "Discussions not found", null));
	}

	@GetMapping("/all")
	public ResponseEntity<ObjectResponse> getAllDiscussions() {
		ServiceResponse<List<DiscussionDTO>> response = discussionService.getAllDiscussions();
		if (response.getDataObject() != null && !response.getDataObject().isEmpty()) {
			return ResponseEntity.ok(new ObjectResponse("200", "Discussions found", response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("404", "Discussions not found", null));
	}

}
