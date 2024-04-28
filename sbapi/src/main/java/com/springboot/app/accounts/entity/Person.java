package com.springboot.app.accounts.entity;

import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "person")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Person extends BaseEntity {
	@PrePersist
	public void prePersist() {
		lowerCaseEmail();
		LocalDateTime now = LocalDateTime.now();
		this.setCreatedAt(now);
		this.setUpdatedAt(now);
	}

	@PreUpdate
	public void preUpdate() {
		lowerCaseEmail();
		LocalDateTime now = LocalDateTime.now();
		this.setUpdatedAt(now);
	}

	private void lowerCaseEmail() {
		if(this.email != null) {
			this.email = this.email.toLowerCase();
		}
	}

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private Long id;

	@Column(name="first_name", length=100)
	private String firstName;

	@Column(name="last_name", length=100)
	private String lastName;

	@Column(name="email", length=100)
	private String email;
}
