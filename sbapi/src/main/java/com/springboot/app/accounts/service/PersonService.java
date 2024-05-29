package com.springboot.app.accounts.service;

import com.springboot.app.accounts.dto.request.AccountInfo;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.ServiceResponse;

public interface PersonService {
	ServiceResponse<Void> updatePersonalInfo(User user, AccountInfo accountInfo);

	ServiceResponse<Void> updateAvatar(User user, String avatar);

}
