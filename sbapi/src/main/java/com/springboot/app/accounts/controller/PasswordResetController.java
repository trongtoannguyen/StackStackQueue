package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.entity.PasswordReset;
import com.springboot.app.accounts.service.PasswordResetService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.security.dto.request.PasswordResetRequest;
import com.springboot.app.security.service.RefreshTokenService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reset-password")
public class PasswordResetController {

	private static final Logger logger = LoggerFactory.getLogger(PasswordResetController.class);

	@Autowired
	private RefreshTokenService refreshTokenService;

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/request")
	public ResponseEntity<?> requestPasswordReset(@RequestParam("email") String email) {
		logger.info(String.format("Reset password request for email '%s'", email));
		ServiceResponse<Void> serviceResponse = passwordResetService.sendPasswordResetEmail(email);
		if(serviceResponse.getAckCode() == AckCodeType.SUCCESS) {
			return ResponseEntity.ok(new ObjectResponse("200","Password reset link sent to your email!",null));
		}
		else {
			return ResponseEntity
					.badRequest()
					.body(new ObjectResponse("400","Error: Password reset link could not be sent!",null));
		}
	}


	@GetMapping("/verify")
	public ResponseEntity<?> verifyResetKey(@RequestParam("key") String key) {
		ServiceResponse<PasswordReset> serviceResponse = passwordResetService.verifyPasswordResetToken(key);
		// Verify token, check expiration, and retrieve user ID
		Long userId = null; ////refreshTokenService.verifyPasswordResetToken(token);
		if (userId != null) {
			// Return user ID in a secure way, such as JWT
			// Redirect to reset password form
			// ...
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("/reset")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequest passwordResetRequest) {
		if(passwordResetRequest.getToken() == null || passwordResetRequest.getToken().isEmpty()) {
			return ResponseEntity
					.badRequest()
					.body(new ObjectResponse("400","Error: Token is required!",null));
		}
		if (!passwordResetRequest.getPassword().equals(passwordResetRequest.getConfirmPassword())) {
			return ResponseEntity
					.badRequest()
					.body(new ObjectResponse("400","Error: Passwords do not match!",null));
		}
		if (!passwordResetRequest.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")) {
			return ResponseEntity
					.badRequest()
					.body(new ObjectResponse("400","Error: Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character!",null));
		}
		refreshTokenService.updatePassword(passwordResetRequest);
		return ResponseEntity.ok(new ObjectResponse("200","Password reset successfully!",null));
	}
}
