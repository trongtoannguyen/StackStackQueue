package com.springboot.app.follows.service;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.follows.entity.Bookmark;
import com.springboot.app.follows.repository.BookmarkRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookmarkServiceImpl implements BookmarkService{

	private static final Logger logger = LoggerFactory.getLogger(BookmarkServiceImpl.class);

	@Autowired
	private BookmarkRepository bookmarkRepository;


	@Override
	public ServiceResponse<Bookmark> getBookmark(Long id) {
		return null;
	}

	@Override
	public ServiceResponse<Bookmark> getBookmarkByCommentId(Long commentId) {
		return null;
	}

	@Override
	public ServiceResponse<Bookmark> getBookmarkByUser(String username) {
		return null;
	}

	@Override
	public ServiceResponse<Bookmark> createBookmark(Bookmark bookmark) {
		return null;
	}

	@Override
	public ServiceResponse<Bookmark> deleteBookmark(Long id) {
		return null;
	}
}
