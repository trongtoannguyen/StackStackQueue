package com.springboot.app.forums.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;

import java.util.List;
import java.util.Map;

public interface ForumService {
	ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> getChildForumsAndForumGroups(ForumGroup forumGroup);
	ServiceResponse<ForumGroup> addForumGroup(ForumGroup newForumGroup, ForumGroup parent);

	ServiceResponse<Void> deleteForumGroup(ForumGroup forumGroup);


	ServiceResponse<Forum> addForum(Forum newForum, ForumGroup forumGroup);

	ServiceResponse<Void> deleteForum(Forum forum);
}
