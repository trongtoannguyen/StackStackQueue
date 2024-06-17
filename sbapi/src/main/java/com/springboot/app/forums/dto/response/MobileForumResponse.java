package com.springboot.app.forums.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MobileForumResponse {
	private Long id; //forum id
	private String title; //forum title

	//discussion
	private List<MobileDiscussionResponse> discussions;
	private int totalComments;
}


