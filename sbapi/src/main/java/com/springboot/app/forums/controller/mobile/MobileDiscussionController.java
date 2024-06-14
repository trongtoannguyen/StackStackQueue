package com.springboot.app.forums.controller.mobile;

import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.controller.DicussionViewController;
import com.springboot.app.forums.dto.DiscussionDTO;
import com.springboot.app.forums.service.CommentService;
import com.springboot.app.forums.service.DiscussionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/mobile/discussion")
public class MobileDiscussionController {

	private static final Logger logger = LoggerFactory.getLogger(MobileDiscussionController.class);

	@Autowired
	private DiscussionService discussionService;
	@Autowired
	private CommentService commentService;

	@GetMapping("/all")
	public ResponseEntity<ObjectResponse> getAllDiscussions() {
		ServiceResponse<List<DiscussionDTO>> response = discussionService.getAllDiscussions();
		if (response.getDataObject() != null && !response.getDataObject().isEmpty()) {
			return ResponseEntity.ok(new ObjectResponse("200", "Discussions found", response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("404", "Discussions not found", null));
	}

}
