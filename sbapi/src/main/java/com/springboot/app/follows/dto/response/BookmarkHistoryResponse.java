package com.springboot.app.follows.dto.response;

import com.springboot.app.accounts.dto.responce.CommentHistoryResponse;

import java.time.LocalDateTime;

public class BookmarkHistoryResponse {

	private Long bookmarkId;
	private String bookmarkBy;
	private LocalDateTime bookmarkedDate;

	private CommentHistoryResponse commentInfo;

	public Long getBookmarkId() {
		return bookmarkId;
	}

	public void setBookmarkId(Long bookmarkId) {
		this.bookmarkId = bookmarkId;
	}

	public String getBookmarkBy() {
		return bookmarkBy;
	}

	public void setBookmarkBy(String bookmarkBy) {
		this.bookmarkBy = bookmarkBy;
	}

	public LocalDateTime getBookmarkedDate() {
		return bookmarkedDate;
	}

	public void setBookmarkedDate(LocalDateTime bookmarkedDate) {
		this.bookmarkedDate = bookmarkedDate;
	}

	public CommentHistoryResponse getCommentInfo() {
		return commentInfo;
	}

	public void setCommentInfo(CommentHistoryResponse commentInfo) {
		this.commentInfo = commentInfo;
	}
}
