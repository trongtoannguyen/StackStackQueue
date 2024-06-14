package com.springboot.app.forums.service;

import java.util.List;

import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.DiscussionDTO;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.DiscussionStat;
import com.springboot.app.tags.Tag;

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

	ServiceResponse<DiscussionStat> updateDiscussionViews(Long id); ;

	ServiceResponse<Discussion> addTagsToDiscussion(Long discussionId, List<Long> tagIds);

	ServiceResponse<List<DiscussionDTO>> getDiscussionsByTagId(Long tagId);
}
