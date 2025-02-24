package com.springboot.app.emails.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.emails.dto.PassResetEmailRequest;
import com.springboot.app.emails.dto.RegistationEmailRequest;
import com.springboot.app.emails.entity.RegistrationOption;

public interface RegistrationOptionService {
	ServiceResponse<RegistrationOption> getRegistrationOptionById(Long id);

	ServiceResponse<Void> updatePassResetEmailOption(PassResetEmailRequest option);

	ServiceResponse<Void> updateRegistrationEmailOption(RegistationEmailRequest option);
}
