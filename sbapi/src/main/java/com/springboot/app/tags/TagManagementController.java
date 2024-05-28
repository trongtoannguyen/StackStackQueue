package com.springboot.app.tags;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.CommentInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/tags")
public class TagManagementController {
	private static final Logger logger = LoggerFactory.getLogger(TagManagementController.class.getName());

	@Autowired
	private TagService tagService;

	@PostMapping("/create")
	public ResponseEntity<ObjectResponse> createNewTag(@RequestBody Tag newTag) {
		logger.info("Creating new tag: {}", newTag.getLabel());
		ServiceResponse<Long> response = tagService.createNewTag(newTag);
		if(response.getAckCode()!= AckCodeType.SUCCESS){
			return ResponseEntity.ok(new ObjectResponse("400", "Tag not created", null));
		}
		return ResponseEntity.ok(new ObjectResponse("201", "Tag created", response.getDataObject()));

	}

	@DeleteMapping("/delete")
	public ResponseEntity<ObjectResponse> deleteTag(@RequestBody Tag tagToDelete) {
		logger.info("Deleting tag: {}", tagToDelete.getLabel());
		ServiceResponse<Void> response = tagService.deleteTag(tagToDelete);
		if(response.getAckCode()!= AckCodeType.SUCCESS){
			return ResponseEntity.ok(new ObjectResponse("400", "Tag not deleted", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Tag deleted", null));
	}

	@GetMapping("/active")
	public ResponseEntity<ObjectResponse> getActiveTags() {
		logger.info("Getting active tags");
		ServiceResponse<List<Tag>> response = tagService.getActiveTags();
		if(response.getAckCode()!= AckCodeType.SUCCESS){
			return ResponseEntity.ok(new ObjectResponse("400", "Tags not found", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Success", response.getDataObject()));
	}

	@GetMapping("/all")
	public ResponseEntity<ObjectResponse> getAllTags() {
		logger.info("Getting all tags");
		ServiceResponse<List<Tag>> response = tagService.getAllTags();
		if(response.getAckCode()!= AckCodeType.SUCCESS){
			return ResponseEntity.ok(new ObjectResponse("400", "Tags not found", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Success", response.getDataObject()));
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
