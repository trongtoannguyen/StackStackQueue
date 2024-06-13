package com.springboot.app.tags;

import java.time.LocalDateTime;
import java.util.List;

import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.model.BaseEntity;

import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "tags")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Cacheable(true)
public class Tag extends BaseEntity {
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

	@Column(name = "lable", length = 100, unique = true)
	private String label;

	@Column(name = "icon", length = 30)
	private String icon;

	@Column(name = "color", length = 30)
	private String color;

	@Column(name = "disabled")
	private boolean disabled;

	@Column(name = "sort_order")
	private Integer sortOrder;
	/**
	 * Note: @Transient thuộc tính này không liên quan gì tới một cột nào dưới
	 * database. fix error: “java.sql.SQLSyntaxErrorException: Unknown column
	 * ‘additionalPropery’ in ‘field list'”.
	 */
	@Transient
	private List<Discussion> discussions;

}
