package com.springboot.app.emails.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.emails.entity.EmailOption;

public interface EmailOptionsService {
	ServiceResponse<EmailOption> getEmailOptionById(Long id);
	ServiceResponse<EmailOption> saveEmailOption(EmailOption emailOption);
	ServiceResponse<Void> updateEmailOption(Long id,EmailOption emailOption);
}
