package com.springboot.app.forums.controller;

import java.util.List;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.request.LastComment;
import com.springboot.app.forums.dto.response.ForumStat;
import com.springboot.app.forums.dto.search.SearchAll;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.repository.DiscussionDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    private DiscussionDAO discussionDAO;

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

	@GetMapping("/search/{keyword}")
	public ResponseEntity<ObjectResponse> getForumSearch(@PathVariable("keyword") String keyword) {
		ServiceResponse<List<SearchAll>> response = forumService.getForumSearch(keyword);
		if(response.getDataObject() == null) {
			return ResponseEntity.ok(new ObjectResponse("404", "Data not found", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Data list", response.getDataObject()));
	}

	@GetMapping("/getLastCommentServiceResponseForum/{id}")
	public ResponseEntity<ObjectResponse> getLastCommentServiceResponse(@PathVariable("id") Long id) {
		ServiceResponse<LastComment> response = forumService.getLastCommentServiceResponse(id);
		if(response.getDataObject() == null) {
			return ResponseEntity.ok(new ObjectResponse("404", "Data not found", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Data", response.getDataObject()));
	}

	@GetMapping("/get-forum-stat")
	public ResponseEntity<ObjectResponse> getForumStat() {
		List<ForumStat> response = discussionDAO.getForumStat();
		if(response == null) {
			return ResponseEntity.ok(new ObjectResponse("404", "Data not found", null));
		}
		return ResponseEntity.ok(new ObjectResponse("200", "Data list", response));
	}
}
