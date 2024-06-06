package com.springboot.app.follows.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.follows.entity.Bookmark;

public interface BookmarkService {
	ServiceResponse<Bookmark> getBookmark(Long id);
	ServiceResponse<Bookmark> getBookmarkByCommentId(Long commentId);
	ServiceResponse<Bookmark> getBookmarkByUser(String username);


	ServiceResponse<Bookmark> createBookmark(Bookmark bookmark);
	ServiceResponse<Bookmark> deleteBookmark(Long id);
}
