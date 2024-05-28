package com.springboot.app.forums.entity;

import java.util.List;

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

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "replyTo")
	@OrderBy("id ASC")
	private List<Comment> replies; // children of this comment

	@Column(name = "IP_address", length = 80)
	private String ipAddress;

	/**
	 * OK to eager fetch attachments as only a handful attachments are expected for
	 * each comment
	 */
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "comment_attachment", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "file_info_id"), foreignKey = @ForeignKey(name = "FK_COMMENT_ATTACHMENT"), inverseForeignKey = @ForeignKey(name = "FK_ATTACHMENT_COMMENT"), indexes = {
			@Index(name = "IDX_COMMENT_ATTACHMENT", columnList = "comment_id,file_info_id") })
	@OrderColumn(name = "sort_order")
	private List<FileInfo> attachments;

	/**
	 * OK to eager fetch attachments as only a handful thumbnails are expected for
	 * each comment
	 */
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "comment_thumbnail", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "file_info_id"), foreignKey = @ForeignKey(name = "FK_COMMENT_THUMBNAIL"), inverseForeignKey = @ForeignKey(name = "FK_THUMBNAIL_COMMENT"), indexes = {
			@Index(name = "IDX_COMMENT_THUMBNAIL", columnList = "comment_id,file_info_id") })
	@OrderColumn(name = "sort_order")
	private List<FileInfo> thumbnails;

	@Column(name = "hidden")
	private boolean hidden;

	@OneToOne
	@JoinColumn(name = "comment_vote_id", foreignKey = @ForeignKey(name = "FK_COMMENT_VOTE"))
	private CommentVote commentVote;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "comment", cascade = CascadeType.ALL)
	@OrderBy("createdAt DESC")
	private List<Bookmark> bookmarks;


}
