package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.dto.responce.UserStatResponse;
import com.springboot.app.bagdes.Badge;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.entity.UserStat;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.accounts.repository.UserStatRepository;
import com.springboot.app.accounts.service.UserStatService;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserStatServiceImpl implements UserStatService {

	private static final Logger logger = LoggerFactory.getLogger(UserStatServiceImpl.class);

	@Autowired
	private UserStatRepository userStatRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DiscussionRepository discussionRepository;
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public PaginateResponse getAllUserStats(int pageNo, int pageSize, String orderBy, String sortDir,String search) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
				: Sort.by(orderBy).descending();
		// create Pageable instance
		Pageable pageable = PageRequest.of(pageNo-1, pageSize, sort);
		// get the list of users from the UserRepository and return it as a Page object
		Page<UserStat> usersPage = userStatRepository.searchByUsername(search,pageable);

		return new PaginateResponse(
				usersPage.getNumber()+1,
				usersPage.getSize(),
				usersPage.getTotalPages(),
				usersPage.getContent().size(),
				usersPage.isLast(),
				usersPage.getContent());
	}

	@Override
	public PaginateResponse getAllUserStatsWithIgnoreAdmin(int pageNo, int pageSize, String orderBy, String sortDir,String search) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
				: Sort.by(orderBy).descending();
		// create Pageable instance
		Pageable pageable = PageRequest.of(pageNo-1, pageSize, sort);
		// get the list of users from the UserRepository and return it as a Page object
		Page<UserStatResponse> usersPage = userRepository.searchByUsernameOrNameWithIgnoreAdmin(search,pageable)
				.map(User::toUserStatResponse);

		return new PaginateResponse(
				usersPage.getNumber()+1,
				usersPage.getSize(),
				usersPage.getTotalPages(),
				usersPage.getContent().size(),
				usersPage.isLast(),
				usersPage.getContent());
	}


	@Override
	public PaginateResponse getCommentByUsername(int page, int size, String orderBy, String sortDirection, String username) {
		return null;
	}

	@Override
	public PaginateResponse getDiscussionByUsername(int page, int size, String orderBy, String sortDirection, String username) {
		return null;
	}

	@Override
	public ServiceResponse<Person> getPersonByUsername(String username) {
		return null;
	}

	@Override
	public ServiceResponse<List<Badge>> getBadgesByUsername(String username) {
		return null;
	}



}
