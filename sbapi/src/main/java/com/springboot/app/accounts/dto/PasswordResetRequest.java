package com.springboot.app.accounts.dto;

import com.springboot.app.accounts.entity.PasswordReset;
import com.springboot.app.accounts.repository.PasswordResetRepository;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.accounts.service.impl.UserServiceImpl;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
public class PasswordResetRequest {
	private PasswordReset passwordReset;
	private String key;
	private String newPassword;

	private boolean errorLoading = false;
	private boolean resetSuccessful = false;

	@Autowired
	private PasswordResetRepository passwordResetRepository;
	@Autowired
	private UserServiceImpl userServiceImpl;

	public void onLoad(){
		List<PasswordReset> foundPasswordReset = passwordResetRepository.findByResetKey(key);
		if(foundPasswordReset.isEmpty()){
			errorLoading = true;
		}
		else{
			this.passwordReset = foundPasswordReset.getFirst();
		}
	}

	public void resetPassword(){
		ServiceResponse<Void> response = userServiceImpl.passwordReset(this.passwordReset, newPassword);
		this.resetSuccessful = response.getAckCode().equals(AckCodeType.SUCCESS);
	}


}
