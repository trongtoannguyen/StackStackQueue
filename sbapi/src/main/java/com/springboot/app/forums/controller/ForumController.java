package com.springboot.app.forums.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.forums.dto.ForumDTO;
import com.springboot.app.forums.dto.ForumGroupDTO;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.service.ForumService;
import com.springboot.app.repository.GenericDAO;

@RestController
@RequestMapping("/api/view/forums")
public class ForumController {

	@Autowired
	private ForumService forumService;

	@Autowired
	private GenericDAO genericDAO;

	@GetMapping("/get-child-forums-and-forum-groups")
	public ResponseEntity<ObjectResponse> getChildForumsAndForumGroups() {
		List<ForumGroupDTO> response = forumService.getChildForumsAndForumGroups();
		return ResponseEntity.ok(new ObjectResponse("200", "Data list", response));
	}

	@GetMapping("/get-all-forum")
	public ResponseEntity<ObjectResponse> getAllForumGroups() {
		List<ForumDTO> response = forumService.getAllForum();
		return ResponseEntity.ok(new ObjectResponse("200", "Data list", response));
	}

	@GetMapping("/get-by-id/{id}")
	public ResponseEntity<ObjectResponse> getById(@PathVariable("id") Long id) {
		Forum forum = genericDAO.find(Forum.class, id);
		if (forum == null) {
			return ResponseEntity.ok(new ObjectResponse("404", "Forum not found", null));
		}
		ForumDTO response = forumService.getById(forum).getDataObject();
		return ResponseEntity.ok(new ObjectResponse("200", "Data", response));
	}
}
