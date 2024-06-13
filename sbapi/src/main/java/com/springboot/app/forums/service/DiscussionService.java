package com.springboot.app.forums.service;

import java.util.List;

import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.DiscussionDTO;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;

public interface DiscussionService {

	ServiceResponse<Discussion> addDiscussion(Discussion newDiscussion, Comment comment, String username,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles);

	ServiceResponse<Void> deleteDiscussion(Discussion discussion);

	ServiceResponse<DiscussionDTO> getById(Long id);

	ServiceResponse<List<DiscussionDTO>> getDiscussionsByForum(Long id);

	ServiceResponse<List<DiscussionDTO>> getAllDiscussions();

	ServiceResponse<Discussion> getDiscussionsById(Long id);

	PaginateResponse getAllDiscussion(int pageNo, int pageSize, String orderBy, String sortDir, String keyword,
			Long forumId);

}
