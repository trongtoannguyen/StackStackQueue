package com.springboot.app.security.dto.response;

import java.util.HashSet;
import java.util.Set;

public class JwtResponse {
	private String accessToken;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String email;
	private Set<String> roles = new HashSet<String>();
	private String avatar;

	public JwtResponse() {
	}
	public JwtResponse(String accessToken, Long id, String username, String email, Set<String> roles) {
		this.accessToken = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
	}

	public JwtResponse(String accessToken, Long id, String username, String email, Set<String> roles, String avatar) {
		this.accessToken = accessToken;
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.avatar = avatar;
	}


	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<String> getRoles() {
		return roles;
	}

	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
}