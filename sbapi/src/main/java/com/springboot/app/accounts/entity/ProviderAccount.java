package com.springboot.app.accounts.entity;

import com.springboot.app.accounts.enumeration.ProviderName;
import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "provider_accounts")
public class ProviderAccount extends BaseEntity {
	@PrePersist
	public void prePersist() {
		LocalDateTime now = LocalDateTime.now();
		this.setCreatedAt(now);
		this.setUpdatedAt(now);
	}

	@PreUpdate
	public void preUpdate() {
		LocalDateTime now = LocalDateTime.now();
		this.setUpdatedAt(now);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "provider_id")
	private String providerId;

	@Column(name = "provider_name")
	@Enumerated(EnumType.STRING)
	private ProviderName providerName;

	@Column(name="email")
	private String email;


	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id",foreignKey = @ForeignKey(name = "FK_PROVIDER_ACCOUNT_USER"))
	private User user;
}
