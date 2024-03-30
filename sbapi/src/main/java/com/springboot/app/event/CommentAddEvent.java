package com.springboot.app.event;

import com.springboot.app.discussions.entity.Comment;
import com.springboot.app.accounts.entity.User;
import org.springframework.context.ApplicationEvent;

public class CommentAddEvent extends ApplicationEvent {

	private static final long serialVersionUID = 1L;

	private Comment comment;
	private User user;

	public CommentAddEvent(Object source, Comment comment, User user) {
		super(source);
		this.comment = comment;
		this.setUser(user);
	}

	public Comment getComment() {
		return comment;
	}
	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}

}
