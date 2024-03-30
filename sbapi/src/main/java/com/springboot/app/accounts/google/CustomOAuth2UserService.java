package com.springboot.app.accounts.google;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.enumeration.AccountStatus;
import com.springboot.app.accounts.enumeration.ProviderName;
import com.springboot.app.accounts.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user =  super.loadUser(userRequest);
		return new CustomOAuth2User(user);
	}

	@Autowired
	private UserRepository repo;

	public void processOAuthPostLogin(String username) {
		User existUser = repo.findByUsername(username).orElse(null);
		if (existUser == null) {
			User newUser = new User();
			newUser.setUsername(username);
			newUser.setEmail(username);
			newUser.setProvider(ProviderName.GOOGLE);
			newUser.setAccountStatus(AccountStatus.ACTIVE);
			repo.save(newUser);
		}
	}

}
