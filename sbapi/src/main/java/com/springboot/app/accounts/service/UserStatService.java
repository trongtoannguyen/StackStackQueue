package com.springboot.app.accounts.service;

import com.springboot.app.bagdes.Badge;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface UserStatService {
	PaginateResponse getAllUserStats(int page, int size, String orderBy, String sortDirection, String search);

	PaginateResponse getAllUserStatsWithIgnoreAdmin(int page, int size, String orderBy, String sortDirection, String search);

	PaginateResponse getCommentByUsername(int page, int size, String orderBy, String sortDirection,String username);

	PaginateResponse getDiscussionByUsername(int page, int size, String orderBy, String sortDirection,String username);

	ServiceResponse<Person> getPersonByUsername(String username);

	ServiceResponse<List<Badge>> getBadgesByUsername(String username);


}

