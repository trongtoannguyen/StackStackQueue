package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.entity.UserStat;
import com.springboot.app.accounts.service.UserHistoryService;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.repository.CommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class UserHistoryServiceImpl implements UserHistoryService {

	private static final Logger logger = LoggerFactory.getLogger(UserHistoryServiceImpl.class);

	@Autowired
	private CommentRepository commentRepository;


	@Override
	public PaginateResponse getAllCommentsByUsername(int pageNo, int pageSize, String orderBy, String sortDir, String username) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
				: Sort.by(orderBy).descending();

		Pageable pageable = PageRequest.of(pageNo-1, pageSize, sort);

		Page<Comment> usersPage = commentRepository.findAllByUsername(username,pageable);

		return new PaginateResponse(
				usersPage.getNumber()+1,
				usersPage.getSize(),
				usersPage.getTotalPages(),
				usersPage.getContent().size(),
				usersPage.isLast(),
				usersPage.getContent());
	}
}
