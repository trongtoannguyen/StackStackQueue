package com.springboot.app.forums.service;

import java.util.List;
import java.util.Map;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.ForumDTO;
import com.springboot.app.forums.dto.ForumGroupDTO;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;

public interface ForumService {

	ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> getChildForumsAndForumGroups(ForumGroup forumGroup);

	ServiceResponse<ForumGroup> addForumGroup(ForumGroup newForumGroup, ForumGroup parent);

	ServiceResponse<Void> deleteForumGroup(ForumGroup forumGroup);

	ServiceResponse<ForumDTO> addForum(Forum newForum, ForumGroup forumGroup, String username);

	ServiceResponse<Void> deleteForum(Forum forum);

	List<ForumGroupDTO> getChildForumsAndForumGroups();

	List<ForumDTO> getAllForum();

	ServiceResponse<ForumDTO> getById(Forum forum);
}
