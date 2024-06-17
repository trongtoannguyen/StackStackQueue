package com.springboot.app.forums.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.springboot.app.model.BaseEntity;
import com.springboot.app.tags.Tag;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "discussions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Discussion extends BaseEntity {
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
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", length = 100, unique = true, nullable = false)
	private String title;

	@Column(name = "closed")
	private boolean closed;

	@Column(name = "sticky")
	private boolean sticky;

	@Column(name = "important")
	private boolean important;

	@OneToMany(mappedBy = "discussion", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("createdAt DESC")
	private List<Comment> comments;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "discussion_stat_id", foreignKey = @ForeignKey(name = "FK_DISCUSSION_STAT"))
	private DiscussionStat stat;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "forum_id", foreignKey = @ForeignKey(name = "FK_DISCUSSION_FORUM"))
	private Forum forum;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "discussion_tags", joinColumns = @JoinColumn(name = "discussion_id"), inverseJoinColumns = @JoinColumn(name = "tag_id"))
	private List<Tag> tags;
}
