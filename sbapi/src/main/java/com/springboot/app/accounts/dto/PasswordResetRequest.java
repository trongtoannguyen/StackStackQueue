package com.springboot.app.accounts.dto;

import com.springboot.app.accounts.entity.PasswordReset;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetRequest {
	private PasswordReset passwordReset;
	private String key;
	private String newPassword;

	private boolean errorLoading = false;
	private boolean resetSuccessful = false;


}
