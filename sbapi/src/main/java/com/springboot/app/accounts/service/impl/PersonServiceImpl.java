package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.PersonRepository;
import com.springboot.app.accounts.service.PersonService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PersonServiceImpl implements PersonService {
	private static final Logger logger = LoggerFactory.getLogger(PersonServiceImpl.class);

	@Autowired
	private PersonRepository personRepository;

	public ServiceResponse<Void> updatePersonalInfo(Person person){
		ServiceResponse<Void> response = new ServiceResponse<>();
		List<String> errors = validatePersonForUpdate(person);
		if(!errors.isEmpty()) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessages(errors);
			return response;
		}
		try {
			personRepository.save(person);
			response.setAckCode(AckCodeType.SUCCESS);
			response.addMessage("personal.info.updated");
		} catch (Exception e) {
			logger.error("Error updating personal info", e);
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("personal.info.update.failed");
		}

		return response;
	}


	private List<String> validatePersonForUpdate(Person person) {
		List<String> errors = new ArrayList<>();
		if(person == null) {
			errors.add("Person is not found");
			return errors;
		}
		if("".equals(person.getFirstName())) {
			errors.add("First Name must not be empty");
		}
		if("".equals(person.getLastName())) {
			errors.add("Last Name must not be empty");
		}
		if("".equals(person.getPhone())){
			errors.add("Phone number must not be empty");
		}
		return errors;
	}
}
