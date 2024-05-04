package com.springboot.app.forums.service;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.Discussion;

import java.util.List;

public interface DiscussionService {

	ServiceResponse<Discussion> addDiscussion(
			Discussion newDiscussion, Comment comment, String username,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles
	);

	ServiceResponse<Void> deleteDiscussion(Discussion discussion);


}
