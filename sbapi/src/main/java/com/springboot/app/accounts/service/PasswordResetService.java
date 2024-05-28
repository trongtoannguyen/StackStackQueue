package com.springboot.app.accounts.service;


import com.springboot.app.accounts.dto.request.PasswordRequest;
import com.springboot.app.accounts.entity.PasswordReset;
import com.springboot.app.dto.response.ServiceResponse;

public interface PasswordResetService {
	ServiceResponse<Void> sendPasswordResetEmail(String email);

	ServiceResponse<Void> updatePassword(PasswordRequest passwordRequest);
}
