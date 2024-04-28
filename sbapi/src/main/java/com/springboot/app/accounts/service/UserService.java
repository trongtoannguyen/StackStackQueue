package com.springboot.app.accounts.service;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.security.dto.request.SignupRequest;

import java.util.List;
import java.util.Optional;

public interface UserService {

	Optional<User> findById(Long id);
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);

	PaginateResponse getAllUsers(int page, int size,String orderBy,String sortDirection);

	User save(SignupRequest signupRequest);

}
