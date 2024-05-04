package com.springboot.app.accounts.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springboot.app.accounts.enumeration.AccountStatus;
import com.springboot.app.accounts.enumeration.AuthProvider;
import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", uniqueConstraints = {
		@UniqueConstraint(columnNames = {
				"username"
		}),
		@UniqueConstraint(columnNames = {
				"email"
		})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	@PrePersist
	public void prePersist() {
		lowerCaseEmail();
		LocalDateTime now = LocalDateTime.now();
		this.setCreatedAt(now);
	}

	@PreUpdate
	public void preUpdate() {
		lowerCaseEmail();
		LocalDateTime now = LocalDateTime.now();
		this.setUpdatedAt(now);
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(min = 3, max = 50)
	private String username;

	@NaturalId
	@NotBlank
	@Size(max = 50)
	@Email
	private String email;

	@JsonIgnore
	@NotBlank
	@Size(min = 6, max = 100)
	private String password;

	@Lob
	private String avatar;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "user_role",
			joinColumns = @JoinColumn(name = "user_id"),inverseJoinColumns = @JoinColumn(name = "role_id"))
	Set<Role> roles = new HashSet<>();

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "person_id",foreignKey = @ForeignKey(name = "FK_USER_PERS"))
	private Person person;

	@Enumerated(EnumType.STRING)
	@Column(name = "account_status", length = 50)
	private AccountStatus accountStatus;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_stat_id", foreignKey = @ForeignKey(name = "FK_USER_USER_STAT"))
	private UserStat stat;

	@Column(name = "provider_id")
	private String providerId;

	@Column(name = "provider_name")
	@Enumerated(EnumType.STRING)
	private AuthProvider provider;

	@Column(name = "name")
	private String name;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "email_verified")
	private Boolean emailVerified = false;

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.accountStatus = AccountStatus.ACTIVE;
	}

	public User(String username, String email, String password, AuthProvider provider) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.provider = provider;
		this.accountStatus = AccountStatus.ACTIVE;
	}

	public User(String username, String email, String password, AccountStatus accountStatus) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.accountStatus = accountStatus;
	}

	public User(String username, String email, AccountStatus accountStatus) {
		this.username = username;
		this.email = email;
		this.accountStatus = accountStatus;
	}


	public User(Long id, String username, String email, String password, String avatar, Set<Role> roles) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.avatar = avatar;
		this.roles = roles;
	}



	private void lowerCaseEmail() {
		if(this.email != null) {
			this.email = this.email.toLowerCase();
		}
	}





}
