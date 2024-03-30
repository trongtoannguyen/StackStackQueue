package com.springboot.app.accounts.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.springboot.app.accounts.enumeration.AccountStatus;
import com.springboot.app.accounts.enumeration.ProviderName;
import com.springboot.app.model.BaseEntity;
import com.springboot.app.profile.entity.Person;
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

	@Enumerated(EnumType.STRING)
	private ProviderName provider;


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


	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public User(String username, String email,ProviderName provider, AccountStatus accountStatus) {
		this.username = username;
		this.email = email;
		this.provider = provider;
		this.accountStatus = accountStatus;
	}

	public User(String username, String email, String password,AccountStatus accountStatus) {
		this.username = username;
		this.email = email;
		this.password = password;
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

//	              @NotBlank @Size(min = 3, max = 50)String username,
//	              @NotBlank @Size(max = 50) @Email String email,
//	              @NotBlank @Size(min = 6, max = 100)String encode) {
//		this.username = username;
//		this.email = email;
//		this.password = encode;
//	}



}
