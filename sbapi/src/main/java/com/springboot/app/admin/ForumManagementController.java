package com.springboot.app.admin;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.forums.service.ForumService;
import com.springboot.app.security.jwt.JwtUtils;
import com.springboot.app.service.GenericService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class ForumManagementController {

	private static final Logger logger = LoggerFactory.getLogger(ForumManagementController.class);

	@Autowired
	private ForumService forumService;
	@Autowired
	private GenericService genericService;

	@PostMapping("/forum-groups")
	public ResponseEntity<ObjectResponse> createForumGroup(@Valid @RequestBody ForumGroup newForumGroup){
		try{
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForumGroup.setCreatedBy(username);
		}catch(Exception e){
			logger.error("Error getting user session: {}", e.getMessage());
		}

		ForumGroup parent = null;
		ServiceResponse<ForumGroup> response = forumService.addForumGroup(newForumGroup, parent);

		if(response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse(
					"201",
					String.format("Created Forum Group %s successfully", newForumGroup.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse(
				"400",
				String.format("Could not create Forum Group: %s", newForumGroup.getTitle()),
				null));
	}

	@DeleteMapping("/forum-groups/{id}")
	public ResponseEntity<ObjectResponse> deleteForumGroup(@PathVariable Long id){
		ForumGroup forumGroup = genericService.findEntity(ForumGroup.class, id).getDataObject();
		if(forumGroup == null){
			return ResponseEntity.ok(new ObjectResponse(
					"404",
					String.format("Forum Group with id %d not found", id),
					null));
		}

		ServiceResponse<Void> response = forumService.deleteForumGroup(forumGroup);
		if(response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse(
					"200",
					String.format("Deleted Forum Group %s successfully", forumGroup.getTitle()),
					null));
		}else {
			return ResponseEntity.ok(new ObjectResponse(
					"400",
					String.format("Could not delete Forum Group: %s", forumGroup.getTitle()),
					null));
		}
	}

	@PutMapping("/forum-groups/{id}")
	public ResponseEntity<ObjectResponse> editForumGroup(@PathVariable Long id,@RequestBody ForumGroup newForumGroup){
		try{
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForumGroup.setCreatedBy(username);
		}catch(Exception e){
			logger.error("Error getting user session: {}", e.getMessage());
		}
		ForumGroup oldForumGroup = genericService.findEntity(ForumGroup.class, id).getDataObject();
		if(oldForumGroup == null){
			return ResponseEntity.ok(new ObjectResponse(
					"404",
					String.format("Forum Group with id %d not found", id),
					null));
		}

		ServiceResponse<ForumGroup> response = genericService.updateEntity(newForumGroup);
		if(response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse(
					"200",
					String.format("Updated Forum Group %s successfully", newForumGroup.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse(
				"400",
				String.format("Could not update Forum Group: %s", newForumGroup.getTitle()),
				null)
		);

	}

	@PostMapping("/forums")
	public ResponseEntity<ObjectResponse> createForum(@RequestBody Forum newForum){
		try{
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForum.setCreatedBy(username);
		}catch(Exception e){
			logger.error("Error getting user session: {}", e.getMessage());
		}


		ServiceResponse<Forum> response = forumService.addForum(newForum, null);
		if(response.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse(
					"201",
					String.format("Created Forum %s successfully", newForum.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse(
				"400",
				String.format("Could not create Forum: %s", newForum.getTitle()),
				null));
	}

	@DeleteMapping("/forums/{id}")
	public ResponseEntity<ObjectResponse> deleteForum(@PathVariable Long id){
		Forum forum = genericService.findEntity(Forum.class, id).getDataObject();
		if(forum == null){
			return ResponseEntity.ok(new ObjectResponse(
					"404",
					String.format("Forum with id %d not found", id),
					null));
		}

		ServiceResponse<Void> response = forumService.deleteForum(forum);
		if(response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse(
					"200",
					String.format("Deleted Forum %s successfully", forum.getTitle()),
					null));
		}
		return ResponseEntity.ok(new ObjectResponse(
				"400",
				String.format("Could not delete Forum: %s", forum.getTitle()),
				null));
	}

	@PutMapping("/forums/{id}")
	public ResponseEntity<ObjectResponse> editForum(@PathVariable Long id, @RequestBody Forum newForum){
		try{
			var userSession = JwtUtils.getSession();
			String username = userSession.getUsername();
			newForum.setCreatedBy(username);
		}catch(Exception e){
			logger.error("Error getting user session: {}", e.getMessage());
		}
		Forum oldForum = genericService.findEntity(Forum.class, id).getDataObject();
		if(oldForum == null){
			return ResponseEntity.ok(new ObjectResponse(
					"404",
					String.format("Forum with id %d not found", id),
					null));
		}

		ServiceResponse<Forum> response = genericService.updateEntity(newForum);
		if(response.getAckCode() != AckCodeType.FAILURE) {
			return ResponseEntity.ok(new ObjectResponse(
					"200",
					String.format("Updated Forum %s successfully", newForum.getTitle()),
					response.getDataObject()));
		}
		return ResponseEntity.ok(new ObjectResponse(
				"400",
				String.format("Could not update Forum: %s", newForum.getTitle()),
				null)
		);
	}
}
