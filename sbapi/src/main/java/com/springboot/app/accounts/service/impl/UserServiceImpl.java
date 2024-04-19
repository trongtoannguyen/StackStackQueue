package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.accounts.service.UserService;
import com.springboot.app.dto.response.PaginateResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;

	@Override
	public Optional<User> findById(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	public Optional<User> findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public PaginateResponse getAllUsers(int pageNo, int pageSize, String orderBy, String sortDir) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
				: Sort.by(orderBy).descending();

		// create Pageable instance
		Pageable pageable = PageRequest.of(pageNo-1, pageSize, sort);
		// get the list of users from the UserRepository and return it as a Page object
		Page<User> usersPage = userRepository.findAll(pageable);

		return new PaginateResponse(
				usersPage.getNumber()+1,
				usersPage.getSize(),
				usersPage.getTotalPages(),
				usersPage.getContent().size(),
				usersPage.isLast(),
				usersPage.getContent());
	}


}
