package com.springboot.app.tags;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.CommentInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class TagManagementController {
	private static final Logger logger = LoggerFactory.getLogger(TagManagementController.class.getName());

	@Autowired
	private TagService tagService;

	@PostMapping("/create")
	public ResponseEntity<ServiceResponse<Long>> createNewTag(@RequestBody Tag newTag) {
		logger.info("Creating new tag: " + newTag.getLabel());
		return ResponseEntity.ok(tagService.createNewTag(newTag));
	}

	@DeleteMapping("/delete")
	public ResponseEntity<ServiceResponse<Void>> deleteTag(@RequestBody Tag tagToDelete) {
		logger.info("Deleting tag: " + tagToDelete.getLabel());
		return ResponseEntity.ok(tagService.deleteTag(tagToDelete));
	}

	@GetMapping("/count-comments")
	public ResponseEntity<ServiceResponse<Long>> countCommentsForTag(@RequestBody Tag tag) {
		logger.info("Counting comments for tag: " + tag.getLabel());
		return ResponseEntity.ok(tagService.countCommentsForTag(tag));
	}

	@GetMapping("/latest-comment-info")
	public ResponseEntity<ServiceResponse<CommentInfo>> getLatestCommentInfoForTag(@RequestBody Tag tag) {
		logger.info("Getting latest comment info for tag: " + tag.getLabel());
		return ResponseEntity.ok(tagService.getLatestCommentInfoForTag(tag));
	}
}
