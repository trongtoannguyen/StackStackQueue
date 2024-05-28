package com.springboot.app.emails.service;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.emails.entity.EmailOption;
import com.springboot.app.emails.repository.EmailOptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmailOptionServiceImpl implements EmailOptionsService {
	private static final Logger logger = LoggerFactory.getLogger(EmailOptionServiceImpl.class);

	@Autowired
	private EmailOptionRepository emailOptionRepository;

	@Override
	public ServiceResponse<EmailOption> getEmailOptionById(Long id) {
		ServiceResponse<EmailOption> response = new ServiceResponse<>();
		EmailOption emailOption = emailOptionRepository.findById(id).orElse(null);
		if(emailOption == null) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("Email option not found");
			return response;
		}
		response.setDataObject(emailOption);
		return response;
	}

	@Override
	public ServiceResponse<EmailOption> saveEmailOption(EmailOption emailOption) {
		ServiceResponse<EmailOption> response = new ServiceResponse<>();

		List<String> errors = validateEmailOption(emailOption);
		if(!errors.isEmpty()) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessages(errors);
			return response;
		}

		EmailOption savedEmailOption = emailOptionRepository.save(emailOption);
		response.setDataObject(savedEmailOption);
		return response;
	}

	@Override
	public ServiceResponse<Void> updateEmailOption(Long id, EmailOption emailOption) {
		ServiceResponse<Void> response = new ServiceResponse<>();

		List<String> errors = validateEmailOption(emailOption);
		if(!errors.isEmpty()) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessages(errors);
			return response;
		}

		EmailOption existingEmailOption = emailOptionRepository.findById(id).orElse(null);
		if(existingEmailOption == null) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("Email option not found");
			return response;
		}
		existingEmailOption.setHost(emailOption.getHost());
		existingEmailOption.setPort(emailOption.getPort());
		existingEmailOption.setUsername(emailOption.getUsername());
		existingEmailOption.setPassword(emailOption.getPassword());
		existingEmailOption.setTlsEnable(emailOption.getTlsEnable());
		existingEmailOption.setAuthentication(emailOption.getAuthentication());
		emailOptionRepository.save(existingEmailOption);
		return response;
	}

	private List<String> validateEmailOption(EmailOption emailOption) {
		List<String> errors = new ArrayList<>();
		// validate email option
		if(emailOption.getHost() == null || emailOption.getHost().isEmpty()){
			errors.add("Host is required");
		}
		if(emailOption.getPort() == null || emailOption.getPort() == 0){
			errors.add("Port is required");
		}
		if(emailOption.getUsername() == null || emailOption.getUsername().isEmpty()){
			errors.add("Username is required");
		}
		if(emailOption.getPassword() == null || emailOption.getPassword().isEmpty()){
			errors.add("Password is required");
		}
		if(emailOption.getTlsEnable() == null){
			errors.add("TlsEnable is required");
		}
		if(emailOption.getAuthentication() == null){
			errors.add("Authentication is required");
		}
		return errors;
	}
}
