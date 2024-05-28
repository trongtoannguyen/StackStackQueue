package com.springboot.app.accounts.service;

import com.springboot.app.accounts.dto.request.UpdateRoleRequest;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.enumeration.AccountStatus;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.security.dto.request.SignupRequest;

import java.util.Optional;

public interface UserService {

	Optional<User> findById(Long id);
	Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);

	PaginateResponse getAllUsers(int page, int size,String orderBy,String sortDirection, String search);
	ServiceResponse<String> getAvatarMember(String username);

	ServiceResponse<User> createNewUser(SignupRequest signupRequest);

	ServiceResponse<Void> deleteUser(User user);

	ServiceResponse<User> updateStatusUser(Long id, String status);

	void updateLastLogin(Long id);

	ServiceResponse<User> updateRoleUser(UpdateRoleRequest updateRoleRequest);

}
