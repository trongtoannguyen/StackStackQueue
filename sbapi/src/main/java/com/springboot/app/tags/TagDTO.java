package com.springboot.app.tags;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TagDTO {
	private Long id;
	private String label;
	private Integer sortOrder;
	private Boolean disabled;
	private String color;
	private String icon;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private String createdBy;
	private String updatedBy;

}
