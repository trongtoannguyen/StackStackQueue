package com.springboot.app.admin;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.ForumDTO;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.service.ForumService;
import com.springboot.app.security.jwt.JwtUtils;
import com.springboot.app.service.GenericService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class ForumManagementController {

	private static final Logger logger = LoggerFactory.getLogger(ForumManagementController.class);

	@Autowired
	private ForumService forumService;

	@Autowired
	private GenericService genericService;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private ModelMapper modelMapper;

	@PostMapping("/forum-groups")
	public ResponseEntity<ObjectResponse> createForumGroup(@Valid @RequestBody ForumGroup newForumGroup,
			BindingResult bindingResult) {
		try {
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForumGroup.setCreatedBy(username);
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}
		// validation newForumGroup
		if (bindingResult.hasErrors()) {
			return ResponseEntity.ok(new ObjectResponse("400", "Invalid Forum Group data", null));
		}

		ForumGroup parent = null;
		ServiceResponse<ForumGroup> response = forumService.addForumGroup(newForumGroup, parent);

		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("201",
					String.format("Created Forum Group %s successfully", newForumGroup.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("400",
				String.format("Could not create Forum Group: %s", newForumGroup.getTitle()), null));
	}

	@DeleteMapping("/forum-groups/delete/{id}")
	public ResponseEntity<ObjectResponse> deleteForumGroup(@PathVariable Long id) {
		ForumGroup forumGroup = genericService.findEntity(ForumGroup.class, id).getDataObject();
		if (forumGroup == null) {
			return ResponseEntity
					.ok(new ObjectResponse("404", String.format("Forum Group with id %d not found", id), null));
		}

		List<Forum> forum = forumRepository.findForumByForumGroupId(id);
		if (!forum.isEmpty()) {
			return ResponseEntity.ok(new ObjectResponse("202",
					String.format("Could not delete Forum Group: %s, it has forums associated with it",
							forumGroup.getTitle()),
					null));
		}

		ServiceResponse<Void> response = forumService.deleteForumGroup(forumGroup);
		if (response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse("200",
					String.format("Deleted Forum Group %s successfully", forumGroup.getTitle()), null));
		} else {
			return ResponseEntity.ok(new ObjectResponse("400",
					String.format("Could not delete Forum Group: %s", forumGroup.getTitle()), null));
		}
	}

	@PutMapping("/forum-groups/update/{id}")
	public ResponseEntity<ObjectResponse> editForumGroup(@PathVariable Long id, @RequestBody ForumGroup newForumGroup) {
		try {
			LocalDateTime now = LocalDateTime.now();
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForumGroup.setUpdatedBy(username);
			newForumGroup.setUpdatedAt(now);
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}
		ForumGroup oldForumGroup = genericService.findEntity(ForumGroup.class, id).getDataObject();
		if (oldForumGroup == null) {
			return ResponseEntity
					.ok(new ObjectResponse("404", String.format("Forum Group with id %d not found", id), null));
		}

		ServiceResponse<ForumGroup> response = genericService.updateEntity(newForumGroup);
		if (response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse("200",
					String.format("Updated Forum Group %s successfully", newForumGroup.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse("400",
				String.format("Could not update Forum Group: %s", newForumGroup.getTitle()), null));

	}

	@PostMapping("/forums")
	public ResponseEntity<ObjectResponse> createForum(@RequestBody ForumDTO newForum) {
		String username = null;
		try {
			var userSession = JwtUtils.getSession();
			username = userSession.getUsername();
			newForum.setCreatedBy(username);
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}

		if (newForum.getIdForumGroup() == null) {
			return ResponseEntity.ok(new ObjectResponse("400", "Forum Group ID is required", null));
		}

		Forum newForumEntity = new Forum();
		newForumEntity.setTitle(newForum.getTitle());
		newForumEntity.setDescription(newForum.getDescription());
		newForumEntity.setIcon(newForum.getIcon());
		newForumEntity.setColor(newForum.getColor());
		newForumEntity.setCreatedBy(newForum.getCreatedBy());

		ForumGroup forumGroup = genericService.findEntity(ForumGroup.class, newForum.getIdForumGroup()).getDataObject();

		ServiceResponse<ForumDTO> response = forumService.addForum(newForumEntity, forumGroup, username);
		if (response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("201",
					String.format("Created Forum %s successfully", newForum.getTitle()), response.getDataObject()));
		}
		return ResponseEntity
				.ok(new ObjectResponse("400", String.format("Could not create Forum: %s", newForum.getTitle()), null));
	}

	@DeleteMapping("/forums/{id}")
	public ResponseEntity<ObjectResponse> deleteForum(@PathVariable Long id) {
		Forum forum = genericService.findEntity(Forum.class, id).getDataObject();
		if (forum == null) {
			return ResponseEntity.ok(new ObjectResponse("404", String.format("Forum with id %d not found", id), null));
		}

		ServiceResponse<Void> response = forumService.deleteForum(forum);
		if (response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(
					new ObjectResponse("200", String.format("Deleted Forum %s successfully", forum.getTitle()), null));
		}
		return ResponseEntity
				.ok(new ObjectResponse("400", String.format("Could not delete Forum: %s", forum.getTitle()), null));
	}

	@PatchMapping("/forums/update/{id}")
	public ResponseEntity<ObjectResponse> editForum(@PathVariable Long id, @RequestBody Forum newForum) {
		try {
			LocalDateTime now = LocalDateTime.now();
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForum.setUpdatedBy(username);
			newForum.setUpdatedAt(now);
		} catch (Exception e) {
			logger.error("Error getting user session: {}", e.getMessage());
		}
		Forum oldForum = genericService.findEntity(Forum.class, id).getDataObject();
		if (oldForum == null) {
			return ResponseEntity.ok(new ObjectResponse("404", String.format("Forum with id %d not found", id), null));
		}

		ServiceResponse<Forum> response = genericService.updateEntity(newForum);

		// map newForum to ForumDTO
		ForumDTO newForumDTO = modelMapper.map(newForum, ForumDTO.class);

		if (response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse("200",
					String.format("Updated Forum %s successfully", newForum.getTitle()), newForumDTO));
		}
		return ResponseEntity
				.ok(new ObjectResponse("400", String.format("Could not update Forum: %s", newForum.getTitle()), null));
	}
}
