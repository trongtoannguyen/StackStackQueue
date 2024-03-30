package com.springboot.app.accounts.entity;

import com.springboot.app.accounts.enumeration.RoleName;
import com.springboot.app.model.BaseEntity;
import com.springboot.app.profile.entity.Person;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "deleted_users")
@Data
@NoArgsConstructor
public class DeletedUser extends BaseEntity {
	@Id
	private Long id;

	@Column(name = "deleted_at", columnDefinition = "DATETIME")
	private LocalDateTime deletedAt;

	@Column(name = "username", length = 50, nullable = false)
	private String username;

	@Column(name = "password", length = 200, nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 50, nullable = false)
	private RoleName role;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "person_id", foreignKey = @ForeignKey(name = "fk_del_user_person"))
	private Person person;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "user_stat_id", foreignKey = @ForeignKey(name = "fk_del_user_stat"))
	private UserStat stat;

}
