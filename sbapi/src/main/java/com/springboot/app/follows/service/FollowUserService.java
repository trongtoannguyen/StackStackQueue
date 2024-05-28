package com.springboot.app.follows.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.follows.dto.FollowUserRequest;

public interface FollowUserService {
	ServiceResponse<Void> addOrEditStatusFollowUser(FollowUserRequest followUserRequest);

	ServiceResponse<Void> deleteFollowUser(Long id);


}
