package com.springboot.app.accounts.service;

import com.springboot.app.accounts.entity.UserStat;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;

import java.util.List;

public interface UserStatService {
	PaginateResponse getAllUserStats(int page, int size, String orderBy, String sortDirection);
}
