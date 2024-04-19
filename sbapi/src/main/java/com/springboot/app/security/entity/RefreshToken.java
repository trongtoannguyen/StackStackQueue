package com.springboot.app.security.entity;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "refresh_tokens")
public class RefreshToken extends BaseEntity {
	@PrePersist
	public void prePersist() {
		LocalDateTime now = LocalDateTime.now();
		this.setCreatedAt(now);
	}

	@PreUpdate
	public void preUpdate() {
		LocalDateTime now = LocalDateTime.now();
		this.setUpdatedAt(now);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "user_id",referencedColumnName = "id")
	private User user;

	@Column(nullable = false, unique = true)
	private String token;

	@Column(nullable = false)
	private Instant expiryDate;

	private boolean available;

	public RefreshToken() {
	}

	public RefreshToken(Long id, User user, String token, Instant expiryDate) {
		this.id = id;
		this.user = user;
		this.token = token;
		this.expiryDate = expiryDate;
	}

	public RefreshToken(Long id, User user, String token, Instant expiryDate, boolean available) {
		this.id = id;
		this.user = user;
		this.token = token;
		this.expiryDate = expiryDate;
		this.available = available;
	}

	@Override
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Instant getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Instant expiryDate) {
		this.expiryDate = expiryDate;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}
}
