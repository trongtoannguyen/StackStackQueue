package com.springboot.app.forums.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.springboot.app.follows.entity.Bookmark;
import com.springboot.app.model.BaseEntity;

import jakarta.persistence.Basic;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@JsonIdentityInfo(
		generator = ObjectIdGenerators.PropertyGenerator.class,
		property = "id")
@Entity
@Table(name = "comments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseEntity {
	@PrePersist
	public void prePersist() {
		this.setCreatedAt(java.time.LocalDateTime.now());
		this.setUpdatedAt(java.time.LocalDateTime.now());
	}

	@PreUpdate
	public void preUpdate() {
		this.setUpdatedAt(java.time.LocalDateTime.now());
	}

	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
	private Long id;

	@Column(name = "title", length = 255)
	private String title;

	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(name = "content", columnDefinition = "LONGTEXT")
	private String content; // content of the comment

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "discussion_id", foreignKey = @ForeignKey(name = "FK_COMMENT_DISCUSSION"))
	private Discussion discussion;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "reply_to_id", foreignKey = @ForeignKey(name = "FK_COMMENT_REPLY_TO"))
	private Comment replyTo; // parent of this comment, top level ones will have this field as null

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "replyTo",cascade = CascadeType.ALL,orphanRemoval = true)
	@OrderBy("id ASC")
	private List<Comment> replies = new ArrayList<>() ; // children of this comment

	@Column(name = "IP_address", length = 80)
	private String ipAddress;

	@Column(name = "hidden")
	private boolean hidden;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "comment_vote_id", foreignKey = @ForeignKey(name = "FK_COMMENT_VOTE"))
	private CommentVote commentVote;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "comment", cascade = CascadeType.ALL,orphanRemoval = true)
	@OrderBy("createdAt DESC")
	private List<Bookmark> bookmarks  = new ArrayList<>();


}
