package com.springboot.app.forums.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.springboot.app.forums.entity.DiscussionStat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DiscussionDTO {
	private Long id;
	private String title;
	private boolean closed;
	private boolean sticky;
	private boolean important;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private String createdBy;
	private String updatedBy;
	private List<CommentDTO> comments;
	private ForumDTO forum;
	private DiscussionStat stat;
}
