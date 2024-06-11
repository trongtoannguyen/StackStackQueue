package com.springboot.app.follows.dto.request;

public class FollowUserRequest {
	private String username;
	private String targetUsername;
	private String status;

	public FollowUserRequest() {
	}

	public FollowUserRequest(String username, String targetUsername, String status) {
		this.username = username;
		this.targetUsername = targetUsername;
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getTargetUsername() {
		return targetUsername;
	}

	public void setTargetUsername(String targetUsername) {
		this.targetUsername = targetUsername;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
}
