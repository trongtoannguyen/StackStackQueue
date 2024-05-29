package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.dto.request.AccountInfo;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.PersonRepository;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.accounts.service.PersonService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {
	private static final Logger logger = LoggerFactory.getLogger(PersonServiceImpl.class);

	@Autowired
	private PersonRepository personRepository;

	@Autowired
	private UserRepository userRepository;

	public ServiceResponse<Void> updatePersonalInfo(User user, AccountInfo accountInfo){
		ServiceResponse<Void> response = new ServiceResponse<>();
		Person person = user.getPerson();
		List<String> errors = validatePersonForUpdate(accountInfo);
		if(!errors.isEmpty()) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessages(errors);
			return response;
		}
		personRepository.save(person);
		response.addMessage("Update personal info successfully");
		return response;
	}


	private List<String> validatePersonForUpdate(AccountInfo accountInfo) {
		List<String> errors = new ArrayList<>();
		if(accountInfo == null) {
			errors.add("Person is not found");
			return errors;
		}
		if("".equals(accountInfo.getFirstName())) {
			errors.add("First Name must not be empty");
		}
		if("".equals(accountInfo.getLastName())) {
			errors.add("Last Name must not be empty");
		}
		if("".equals(accountInfo.getPhone())){
			errors.add("Phone number must not be empty");
		}
		if("".equals(accountInfo.getAddress())){
			errors.add("Address must not be empty");
		}
		//check if birthday must be over 18 years old
		if(accountInfo.getBirthday() != null) {
			LocalDate now = LocalDate.now();
			int age = now.getYear() - accountInfo.getBirthday().getYear();
			if(age < 18) {
				errors.add("Birthday must be over 18 years old");
			}
		}
		return errors;
	}

	public ServiceResponse<Void> updateAvatar(User user, String avatar) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		user.setAvatar(avatar);
		userRepository.save(user);
		response.addMessage("Update avatar successfully");
		return response;
	}


}
