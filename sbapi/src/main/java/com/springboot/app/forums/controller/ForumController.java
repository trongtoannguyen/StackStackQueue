package com.springboot.app.forums.controller;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.forums.service.ForumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/forums")
public class ForumController {

	@Autowired
	private ForumService forumService;

	@RequestMapping("/get-child-forums-and-forum-groups")
	public ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> getChildForumsAndForumGroups(ForumGroup forumGroup) {
		return forumService.getChildForumsAndForumGroups(forumGroup);
	}

	@RequestMapping("/add-forum-group")
	public ServiceResponse<ForumGroup> addForumGroup(ForumGroup newForumGroup, ForumGroup parent) {
		return forumService.addForumGroup(newForumGroup, parent);
	}

	@RequestMapping("/delete-forum-group")
	public ServiceResponse<Void> deleteForumGroup(ForumGroup forumGroup) {
		return forumService.deleteForumGroup(forumGroup);
	}

	@RequestMapping("/add-forum")
	public ServiceResponse<Forum> addForum(Forum newForum, ForumGroup forumGroup) {
		return forumService.addForum(newForum, forumGroup);
	}

	@RequestMapping("/delete-forum")
	public ServiceResponse<Void> deleteForum(Forum forum) {
		return forumService.deleteForum(forum);
	}
}
