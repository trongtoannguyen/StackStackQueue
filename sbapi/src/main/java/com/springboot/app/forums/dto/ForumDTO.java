package com.springboot.app.forums.dto;

import java.time.LocalDateTime;

import com.springboot.app.forums.entity.ForumStat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ForumDTO {
	private Long id;
	private String title;
	private String description;
	private String icon;
	private String color;
	private boolean active;
	private Integer sortOrder;
	private String createdBy;
	private String updatedBy;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Long idForumGroup;
	private ForumGroupDTO forumGroup;
	private ForumStat stat;
}