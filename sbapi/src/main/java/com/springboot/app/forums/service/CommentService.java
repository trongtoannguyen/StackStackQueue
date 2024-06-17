package com.springboot.app.forums.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.CommentDTO;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.dto.response.DiscussionResponse;
import com.springboot.app.forums.dto.search.SearchAll;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.FileInfo;

public interface CommentService {
	PaginateResponse getAllCommentsByDiscussionId(int pageNo, int pageSize, String orderBy, String sortDir,
			Long discussionId);

	ServiceResponse<DiscussionResponse> getFirstCommentByDiscussionId(Long discussionId);


	ServiceResponse<Comment> addComment(Long discussionId, Comment comment, String username, Long replyToId,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles);

	ServiceResponse<Comment> deleteComment(Long id);

	Comment updateComment(Comment comment);

	ServiceResponse<List<CommentDTO>> getAllComment();

	ServiceResponse<List<SearchAll>> getSearchComments(String keyword);
}
