package com.springboot.app.admin.service;

import com.springboot.app.dto.response.ServiceResponse;

import java.util.Map;

public interface AdminDashboardService {
	ServiceResponse<Number> countUsers();
	ServiceResponse<Number> countForums();
	ServiceResponse<Number> countDiscussions();
	ServiceResponse<Number> countComments();

	ServiceResponse<Map<String,Integer>> countUsersByForum();

	ServiceResponse<Map<String,Integer>> countDiscussionsByForum();

	ServiceResponse<Map<String,Integer>> countCommentsByForum();
}
