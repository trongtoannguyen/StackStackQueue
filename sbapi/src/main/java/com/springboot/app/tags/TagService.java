package com.springboot.app.tags;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.CommentInfo;

import java.util.List;

public interface TagService {
	ServiceResponse<Long> createNewTag(Tag newTag);
	ServiceResponse<Void> deleteTag(Tag tagToDelete);
	ServiceResponse<Long> countCommentsForTag(Tag tag);
	ServiceResponse<CommentInfo> getLatestCommentInfoForTag(Tag tag);

}
