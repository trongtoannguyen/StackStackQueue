package com.springboot.app.accounts.service;

import com.springboot.app.dto.response.PaginateResponse;

public interface UserHistoryService {
	PaginateResponse getAllCommentsByUsername(int page, int size, String orderBy, String sortDirection, String username);
}
