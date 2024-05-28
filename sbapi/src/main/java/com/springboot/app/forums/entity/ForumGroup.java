package com.springboot.app.forums.entity;

import java.util.List;

import com.springboot.app.model.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "forum_groups")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForumGroup extends BaseEntity {
	@PrePersist
	public void prePersist() {
		this.setCreatedAt(java.time.LocalDateTime.now());
	}

	@PreUpdate
	public void preUpdate() {
		this.setUpdatedAt(java.time.LocalDateTime.now());
	}

	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", length = 100, unique = true)
	private String title;

	@Column(name = "icon", length = 50)
	private String icon;

	@Column(name = "color", length = 50)
	private String color;

	/**
	 * Note: set cascade type to CascadeType.REMOVE to delete all forums in this
	 * group when the group is deleted
	 */
	@OneToMany(mappedBy = "forumGroup", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@OrderBy("sortOrder ASC")
	private List<Forum> forums; // use List instead of Set to maintain the order of forums

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "parent_id", foreignKey = @ForeignKey(name = "FK_FORUM_GROUP_PARENT"))
	private ForumGroup parent;

	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@OrderBy("sortOrder ASC")
	private List<ForumGroup> subGroups; // use List instead of Set to maintain the order of sub groups

	@Column(name = "sort_order")
	private Integer sortOrder;
}
