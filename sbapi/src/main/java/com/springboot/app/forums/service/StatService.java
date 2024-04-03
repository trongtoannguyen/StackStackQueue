package com.springboot.app.forums.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumStat;

public interface StatService {
	ServiceResponse<ForumStat> synchForumStat(Forum forum);
}
