package com.springboot.app.accounts.service;

import com.springboot.app.accounts.entity.Person;
import com.springboot.app.dto.response.ServiceResponse;

public interface PersonService {
	ServiceResponse<Void> updatePersonalInfo(Person person);

}
