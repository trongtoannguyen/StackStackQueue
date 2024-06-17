package com.springboot.app.forums.service.impl;

import java.time.LocalDateTime;
import java.util.*;

import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.accounts.service.UserStatService;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.follows.dto.response.BookmarkResponse;
import com.springboot.app.follows.entity.Bookmark;
import com.springboot.app.forums.dto.response.Author;
import com.springboot.app.forums.dto.response.DiscussionResponse;
import com.springboot.app.forums.dto.response.ReplyItem;
import com.springboot.app.forums.dto.response.ViewCommentResponse;
import com.springboot.app.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.CommentVote;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.DiscussionStat;
import com.springboot.app.forums.entity.FileInfo;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumStat;
import com.springboot.app.forums.entity.Vote;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.CommentVoteRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.service.CommentService;
import com.springboot.app.repository.CommentDAO;
import com.springboot.app.repository.GenericDAO;
import com.springboot.app.service.FileInfoHelper;
import com.springboot.app.service.FileService;
import com.springboot.app.utils.JSFUtils;

import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.TextExtractor;

@Service
public class CommentServiceImpl implements CommentService {
	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private GenericDAO genericDAO;

	@Autowired
	private FileInfoHelper fileInfoHelper;
	@Autowired
	private FileService fileService;

	@Autowired
	private CommentDAO commentDAO;

	@Autowired
	private CommentVoteRepository commentVoteRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private UserStatService userStatService;

	@Autowired
	private UserRepository userRepository;

	@Override
	public PaginateResponse getAllCommentsByDiscussionId(int pageNo, int pageSize, String orderBy, String sortDir,
			Long discussionId) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
				: Sort.by(orderBy).descending();

		Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
		Discussion discussion = discussionRepository.findById(discussionId).orElse(null);
		Page<ViewCommentResponse> itemsPage = commentRepository.findAllByDiscussion(discussion, pageable)
				.map(this::mapCommentToViewCommentResponse);

		return new PaginateResponse(itemsPage.getNumber() + 1, itemsPage.getSize(), itemsPage.getTotalPages(),
				itemsPage.getContent().size(), itemsPage.isLast(), itemsPage.getContent());
	}

	@Override
	public ServiceResponse<DiscussionResponse> getFirstCommentByDiscussionId(Long discussionId) {
		ServiceResponse<DiscussionResponse> response = new ServiceResponse<>();
		Discussion discussion = discussionRepository.findById(discussionId).orElse(null);
		if (discussion != null) {
			DiscussionResponse discussionResponse = new DiscussionResponse();
			discussionResponse.setDiscussionId(discussion.getId());
			discussionResponse.setDiscussionTitle(discussion.getTitle());
			discussionResponse.setForumId(discussion.getForum().getId());
			discussionResponse.setForumTitle(discussion.getForum().getTitle());
			discussionResponse.setForumGroupId(discussion.getForum().getForumGroup().getId());
			discussionResponse.setForumGroupTitle(discussion.getForum().getForumGroup().getTitle());

			Comment firstComment = commentRepository.findFirstCommentByDiscussion(discussion);
			if (firstComment != null) {
				ViewCommentResponse viewCommentResponse = mapCommentToViewCommentResponse(firstComment);
				discussionResponse.setCommentInfo(viewCommentResponse);
				response.setDataObject(discussionResponse);
				response.setAckCode(AckCodeType.SUCCESS);
				return response;
			}
		}
		response.setAckCode(AckCodeType.FAILURE);
		return response;
	}

	@Override
	public ViewCommentResponse mapCommentToViewCommentResponse(Comment comment) {
		ViewCommentResponse viewCommentResponse = new ViewCommentResponse();
		viewCommentResponse.setCommentId(comment.getId());
		viewCommentResponse.setCreatedAt(comment.getCreatedAt());
		viewCommentResponse.setUpdatedAt(comment.getUpdatedAt());

		Author author = new Author();
		author.setUsername(comment.getCreatedBy());
		User user = userRepository.findByUsername(comment.getCreatedBy()).orElse(null);
		if (user != null) {
			author.setAvatar(user.getAvatar());
			author.setImageUrl(user.getImageUrl());
			author.setReputation(user.getStat().getReputation());
			author.setTotalDiscussions(user.getStat().getDiscussionCount());
			author.setTotalComments(user.getStat().getCommentCount());
		}
		viewCommentResponse.setAuthor(author);

		viewCommentResponse.setDiscussionId(comment.getDiscussion().getId());
		// check if first comment of discussion
		Comment firstComment = commentRepository.findFirstCommentByDiscussion(comment.getDiscussion());
		viewCommentResponse.setFirstComment(firstComment.getId().equals(comment.getId()));

		Discussion discussion = comment.getDiscussion();
		if (discussion.getTags() != null && !discussion.getTags().isEmpty()) {
			List<Tag> tags = discussion.getTags();
			viewCommentResponse.setTags(tags);
		}
		viewCommentResponse.setClosed(discussion.isClosed());
		// comment info
		viewCommentResponse.setTitle(comment.getTitle());
		viewCommentResponse.setContent(comment.getContent());
		viewCommentResponse.setHidden(comment.isHidden());
		if(comment.getReplies()!=null && !comment.getReplies().isEmpty()){
			List<ReplyItem> replyResponses = comment.getReplies().stream().map(this::mapReplyToReplyResponse).toList();
			viewCommentResponse.setReplies(replyResponses);
		}
		// votes
		CommentVote commentVote = comment.getCommentVote();
		if (commentVote != null && commentVote.getVotes() != null && !commentVote.getVotes().isEmpty()) {
			viewCommentResponse.setVotes(commentVote.getVotes());
			// get total votes on comment
			Long totalVotes = commentVote.getVotes().stream().mapToLong(Vote::getVoteValue).sum();
			viewCommentResponse.setTotalVotes(totalVotes);
		}
		// bookmark
		if (comment.getBookmarks() != null && !comment.getBookmarks().isEmpty()) {
			List<BookmarkResponse> bookmarkResponses = comment.getBookmarks().stream()
					.map(this::mapBookmarkToBookmarkResponse).toList();
			viewCommentResponse.setBookmarks(bookmarkResponses);
		}
		return viewCommentResponse;
	}

	private ReplyItem mapReplyToReplyResponse(Comment reply) {
		ReplyItem replyItem = new ReplyItem();
		replyItem.setReplyId(reply.getId());
		replyItem.setContent(reply.getContent());
		replyItem.setCreatedAt(reply.getCreatedAt());
		//author
		Author author = new Author();
		author.setUsername(reply.getCreatedBy());
		replyItem.setAuthor(author);
		return replyItem;
	}

	private BookmarkResponse mapBookmarkToBookmarkResponse(Bookmark bookmark) {
		BookmarkResponse bookmarkResponse = new BookmarkResponse();
		bookmarkResponse.setId(bookmark.getId());
		bookmarkResponse.setBookmarkBy(bookmark.getBookmarkBy());
		bookmarkResponse.setBookmarked(bookmark.getBookmarked());
		bookmarkResponse.setBookmarkedDate(bookmark.getBookmarkedDate());
		return bookmarkResponse;
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Comment> addComment(Long discussionId, Comment comment, String username, Long replyToId,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles) {
		ServiceResponse<Comment> response = new ServiceResponse<>();

		if (replyToId != null) {
			Comment replyTo = commentRepository.findById(replyToId)
					.orElseThrow(() -> new IllegalArgumentException("Invalid replyToId"));
			comment.setReplyTo(replyTo);
		}

		Discussion discussionEntity = discussionRepository.findById(discussionId)
				.orElseThrow(() -> new IllegalArgumentException("Invalid discussionId"));

		comment.setCreatedBy(username);
		comment.setIpAddress(JSFUtils.getRemoteIPAddress());
		comment.setThumbnails(fileInfoHelper.createThumbnails(thumbnailFiles));
		comment.setAttachments(fileInfoHelper.createAttachments(attachmentFiles));

		CommentVote commentVote = new CommentVote();
		commentVote.setCreatedBy(username);
		commentVote.setCreatedAt(LocalDateTime.now());
		commentVoteRepository.save(commentVote);

		comment.setCommentVote(commentVote);

		comment.setDiscussion(discussionEntity); // Save the Discussion

		commentRepository.save(comment);

		// Update the Discussion Stat
		updateDiscussionLastComment(discussionEntity, comment, username);

		// Update the Forum Stat
		ForumStat forumStat = updateForumStat(discussionEntity.getForum(), username, discussionEntity);
		discussionEntity.getForum().setStat(forumStat);

		// Update the User Stat
		userStatService.syncUserStat(username);

		// Save the Forum
		Forum forum = discussionEntity.getForum();
		forum.getDiscussions().add(discussionEntity);
		forumRepository.save(forum);

		response.setDataObject(comment);
		return response;
	}

	private ForumStat updateForumStat(Forum forum, String username, Discussion discussion) {
		ForumStat forumStat = forum.getStat();
		forumStat.setUpdatedAt(LocalDateTime.now());
		forumStat.setUpdatedBy(username);
		forumStat.setCommentCount(forumStat.getCommentCount() + 1);
		forumStat.setLastComment(discussion.getStat().getLastComment());
		return forumStat;
	}

	private DiscussionStat updateDiscussionLastComment(Discussion discussion, Comment comment, String username) {
		DiscussionStat discussionStat = discussion.getStat();
		discussionStat.setCommentCount(discussionStat.getCommentCount() + 1);

		CommentInfo lastComment = discussionStat.getLastComment();
		String contentAbbreviation = new TextExtractor(new Source(comment.getContent())).toString();
		String contentAbbr = contentAbbreviation.length() > 100 ? contentAbbreviation.substring(0, 97) + "..."
				: contentAbbreviation;

		lastComment.setUpdatedBy(username);
		lastComment.setUpdatedAt(LocalDateTime.now());
		lastComment.setCommentId(comment.getId());
		lastComment.setCommenter(username);
		lastComment.setTitle(comment.getTitle());
		lastComment.setCommentDate(comment.getCreatedAt());
		lastComment.setContentAbbr(contentAbbr);

		// Set the last comment
		discussionStat.setUpdatedAt(LocalDateTime.now());
		discussionStat.setUpdatedBy(username);
		discussionStat.setLastComment(lastComment);

		return discussionStat;

	}

	@Override
	@Transactional
	public Comment updateComment(Comment comment) {
		Optional<Comment> optionalComment = commentRepository.findById(comment.getId());
		if (optionalComment.isPresent()) {
			return commentRepository.save(comment);
		} else {
			throw new RuntimeException("Comment not found with id " + comment.getId());
		}
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Comment> deleteComment(Long id) {
		ServiceResponse<Comment> response = new ServiceResponse<>();
		Optional<Comment> optionalComment = commentRepository.findById(id);
		if (optionalComment.isPresent()) {
			Comment comment = optionalComment.get();
			deleteChildComments(comment);
			commentRepository.delete(comment);
			response.setDataObject(comment);
			response.setAckCode(AckCodeType.SUCCESS);
		} else {
			response.setAckCode(AckCodeType.FAILURE);
		}
        return response;
    }

	private void deleteChildComments(Comment parentComment) {
		List<Comment> childComments = commentRepository.findByReplyTo(parentComment);
		for (Comment childComment : childComments) {
			deleteChildComments(childComment);
			commentRepository.delete(childComment);
		}
	}


	@Override
	public String getContentByCommentId(Long id) {
		Comment comment = commentRepository.findById(id).orElse(null);
		if (comment != null) {
			return comment.getContent();
		}
		return null;
	}

}
