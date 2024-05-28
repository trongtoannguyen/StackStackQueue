package com.springboot.app.forums.dto;

import java.time.LocalDateTime;

import com.springboot.app.forums.entity.CommentVote;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
	private Long id;
	private String title;
	private String content;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private String createdBy;
	private String updatedBy;
	private String ipAddress;
	private Long discussionId;
	private CommentVote commentVote;
}
