package com.springboot.app.accounts.entity;

import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "registration_options")
public class RegistrationOption extends BaseEntity {
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
	private Long id;

	@Column(name="enable_email_confirm")
	private Boolean enableEmailConfirm;

	@Column(name="registration_email_subject", length = 200)
	private String registrationEmailSubject;

	@Lob @Basic
	@Column(name="registration_email_template", columnDefinition = "LONGTEXT")
	private String registrationEmailTemplate;


	@Column(name="password_reset_email_subject", length = 200)
	private String passwordResetEmailSubject;

	@Lob @Basic
	@Column(name="password_reset_email_template")
	private String passwordResetEmailTemplate;

}
