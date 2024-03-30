package com.springboot.app.discussions.entity;

import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="comment_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentInfo extends BaseEntity {
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

	@Column(name="title",length = 255)
	private String title;

	@Column(name="content_abbr",length = 255)
	private String contentAbbr; // abbreviated content of the comment for display

	@Column(name="comment_id")
	private Long commentId; // id of the comment

	@Column(name="commenter")
	private String commenter;
}
