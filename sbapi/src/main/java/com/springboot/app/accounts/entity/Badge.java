package com.springboot.app.accounts.entity;

import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "badges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Badge extends BaseEntity {
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

	@Column(name = "name", length = 50)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "icon",length = 50)
	private String icon;

	@Column(name = "color",length = 50)
	private String color;

	@Column(name = "criteria")
	private long criteria;

	@Column(name = "type")
	private String type;

	@Column(name="action")
	private boolean action;

}
