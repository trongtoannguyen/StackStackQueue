package com.springboot.app.forums.dto.response;

public class Author {
	private String username;
	private String avatar;
	private String imageUrl;
	private Long reputation;
	private Long totalDiscussions;
	private Long totalComments;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Long getReputation() {
		return reputation;
	}

	public void setReputation(Long reputation) {
		this.reputation = reputation;
	}

	public Long getTotalDiscussions() {
		return totalDiscussions;
	}

	public void setTotalDiscussions(Long totalDiscussions) {
		this.totalDiscussions = totalDiscussions;
	}

	public Long getTotalComments() {
		return totalComments;
	}

	public void setTotalComments(Long totalComments) {
		this.totalComments = totalComments;
	}
}
