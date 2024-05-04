package com.springboot.app.forums.service;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.FileInfo;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface CommentService {

	ServiceResponse<Void> addReply(Comment reply, User user, List<UploadedFileData> thumbnailList, List<UploadedFileData> attachmentList);

	ServiceResponse<Comment> addCommentThumbnail(Comment comment, UploadedFileData uploadedFile);

	ServiceResponse<Comment> addCommentAttachment(Comment comment, UploadedFileData uploadedFile);

	ServiceResponse<Boolean> deleteCommentThumbnail(Comment comment, FileInfo thumbnail);

	ServiceResponse<Boolean> deleteCommentAttachment(Comment comment, FileInfo attachment);

	ServiceResponse<List<Comment>> getLatestCommentsForUser(String username, int maxResult);

	ServiceResponse<Map<String, Integer>> getMostCommentsUsers(Date since, Integer maxResult);

	ServiceResponse<Boolean> isFirstComment(Comment comment);
}
