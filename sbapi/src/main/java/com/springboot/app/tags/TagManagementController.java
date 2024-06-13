package com.springboot.app.tags;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.security.jwt.JwtUtils;

@RestController
@RequestMapping("/api/admin/tags")
public class TagManagementController {
	private static final Logger logger = LoggerFactory.getLogger(TagManagementController.class.getName());

//	@PostMapping("/create")
//	public ResponseEntity<ObjectResponse> createNewTag(@RequestBody Tag newTag) {
//		logger.info("Creating new tag: {}", newTag.getLabel());
//		ServiceResponse<Long> response = tagService.createNewTag(newTag);
//		if(response.getAckCode()!= AckCodeType.SUCCESS){
//			return ResponseEntity.ok(new ObjectResponse("400", "Tag not created", null));
//		}
//		return ResponseEntity.ok(new ObjectResponse("201", "Tag created", response.getDataObject()));
//
//	}
//
//	@DeleteMapping("/delete")
//	public ResponseEntity<ObjectResponse> deleteTag(@RequestBody Tag tagToDelete) {
//		logger.info("Deleting tag: {}", tagToDelete.getLabel());
//		ServiceResponse<Void> response = tagService.deleteTag(tagToDelete);
//		if(response.getAckCode()!= AckCodeType.SUCCESS){
//			return ResponseEntity.ok(new ObjectResponse("400", "Tag not deleted", null));
//		}
//		return ResponseEntity.ok(new ObjectResponse("200", "Tag deleted", null));
//	}
//
//	@GetMapping("/active")
//	public ResponseEntity<ObjectResponse> getActiveTags() {
//		logger.info("Getting active tags");
//		ServiceResponse<List<Tag>> response = tagService.getActiveTags();
//		if(response.getAckCode()!= AckCodeType.SUCCESS){
//			return ResponseEntity.ok(new ObjectResponse("400", "Tags not found", null));
//		}
//		return ResponseEntity.ok(new ObjectResponse("200", "Success", response.getDataObject()));
//	}
//
//	@GetMapping("/all")
//	public ResponseEntity<ObjectResponse> getAllTags() {
//		logger.info("Getting all tags");
//		ServiceResponse<List<Tag>> response = tagService.getAllTags();
//		if(response.getAckCode()!= AckCodeType.SUCCESS){
//			return ResponseEntity.ok(new ObjectResponse("400", "Tags not found", null));
//		}
//		return ResponseEntity.ok(new ObjectResponse("200", "Success", response.getDataObject()));
//	}
//
//	@GetMapping("/count-comments")
//	public ResponseEntity<ServiceResponse<Long>> countCommentsForTag(@RequestBody Tag tag) {
//		logger.info("Counting comments for tag: " + tag.getLabel());
//		return ResponseEntity.ok(tagService.countCommentsForTag(tag));
//	}
//
//	@GetMapping("/latest-comment-info")
//	public ResponseEntity<ServiceResponse<CommentInfo>> getLatestCommentInfoForTag(@RequestBody Tag tag) {
//		logger.info("Getting latest comment info for tag: " + tag.getLabel());
//		return ResponseEntity.ok(tagService.getLatestCommentInfoForTag(tag));
//	}

	@Autowired
	private TagService tagService;

	@Autowired
	private ModelMapper modelMapper;

	@GetMapping("")
	public ResponseEntity<ObjectResponse> getAllTags(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "10", required = false) int size,
			@RequestParam(value = "orderBy", defaultValue = "id", required = false) String orderBy,
			@RequestParam(value = "sort", defaultValue = "ASC", required = false) String sort,
			@RequestParam(value = "search", defaultValue = "", required = false) String search) {
		return ResponseEntity
				.ok(new ObjectResponse("201", "Success", tagService.getAllTags(page, size, orderBy, sort, search)));
	}

	@PostMapping("/create")
	public ResponseEntity<ObjectResponse> createNewTag(@RequestBody Tag newTag) {
		logger.info("Creating new tag: {}", newTag.getLabel());

		try {
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newTag.setCreatedBy(username);
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}
		ServiceResponse<Tag> response = tagService.createNewTag(newTag);
		TagDTO tagDTO = modelMapper.map(response.getDataObject(), TagDTO.class);

		if (response.getAckCode() != AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("400", "Tag not created", tagDTO));
		}
		return ResponseEntity
				.ok(new ObjectResponse("201", String.format("Tag %s created successfully", newTag.getLabel()), tagDTO));

	}

	@PutMapping("/update")
	public ResponseEntity<ObjectResponse> updateTag(@RequestBody Tag tagToUpdate) {
		logger.info("Updating tag: {}", tagToUpdate.getLabel());
		try {
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			tagToUpdate.setUpdatedBy(username);
			tagToUpdate.setUpdatedAt(LocalDateTime.now());
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}
		ServiceResponse<Tag> response = tagService.updateTag(tagToUpdate);
		TagDTO tagDTO = modelMapper.map(response.getDataObject(), TagDTO.class);
		if (response.getAckCode() != AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("400", "Tag not updated", null));
		}
		return ResponseEntity.ok(
				new ObjectResponse("200", String.format("Tag %s update successfully", tagToUpdate.getLabel()), tagDTO));
	}
}
