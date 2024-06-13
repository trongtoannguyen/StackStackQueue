package com.springboot.app.forums.service.impl;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.follows.dto.response.BookmarkHistoryResponse;
import com.springboot.app.follows.dto.response.BookmarkResponse;
import com.springboot.app.follows.entity.Bookmark;
import com.springboot.app.forums.dto.response.Author;
import com.springboot.app.forums.dto.response.DiscussionResponse;
import com.springboot.app.forums.dto.response.ReplyItem;
import com.springboot.app.forums.dto.response.ViewCommentResponse;
import com.springboot.app.forums.entity.*;
import com.springboot.app.repository.VoteDAO;
import com.springboot.app.tags.Tag;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.follows.dto.response.BookmarkResponse;
import com.springboot.app.follows.entity.Bookmark;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.dto.response.Author;
import com.springboot.app.forums.dto.response.DiscussionResponse;
import com.springboot.app.forums.dto.response.ViewCommentResponse;
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
import com.springboot.app.forums.service.DiscussionService;
import com.springboot.app.repository.CommentDAO;
import com.springboot.app.repository.GenericDAO;
import com.springboot.app.service.FileInfoHelper;
import com.springboot.app.service.FileService;
import com.springboot.app.tags.Tag;
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
	private DiscussionService discussionService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public ServiceResponse<List<Comment>> getComments(Discussion discussion) {
		ServiceResponse<List<Comment>> response = new ServiceResponse<>();

		Map<String, Object> equalAttrs = new HashMap<>();
		equalAttrs.put("discussion", discussion);

		List<Comment> comments = genericDAO.getEntities(Comment.class, equalAttrs);

		response.setDataObject(comments);
		return response;
	}

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

	private ViewCommentResponse mapCommentToViewCommentResponse(Comment comment) {
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
	public ServiceResponse<Void> addReply(Comment reply, User user, List<UploadedFileData> thumbnailList,
			List<UploadedFileData> attachmentList) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		String username = user.getUsername();
		reply.setCreatedBy(username);

		Discussion discussion = reply.getDiscussion();
		discussion.getComments().add(reply);

		reply.setThumbnails(fileInfoHelper.createThumbnails(thumbnailList));
		reply.setAttachments(fileInfoHelper.createAttachments(attachmentList));

		reply.setCommentVote(new CommentVote());

		commentRepository.save(reply);
//		genericDAO.persist(reply);

		Comment replyTo = reply.getReplyTo();
		if (replyTo != null) {
			replyTo.getReplies().add(reply);
			commentRepository.save(replyTo);
//			genericDAO.merge(replyTo);
		}

		genericDAO.merge(discussion);

		return response;
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Comment> addCommentThumbnail(Comment comment, UploadedFileData uploadedFile) {
		ServiceResponse<Comment> response = new ServiceResponse<>();
		FileInfo thumbnail = fileInfoHelper.createThumbnail(uploadedFile);
		if (thumbnail != null) {
			comment.getThumbnails().add(thumbnail);
			Comment savedComment = commentRepository.save(comment);
			response.setDataObject(savedComment);
		} else {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("Failed to create thumbnail for uploaded file");
		}

		return response;
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Comment> addCommentAttachment(Comment comment, UploadedFileData uploadedFile) {
		ServiceResponse<Comment> response = new ServiceResponse<>();
		FileInfo attachment = fileInfoHelper.createAttachment(uploadedFile);
		if (attachment != null) {
			comment.getAttachments().add(attachment);
			Comment savedComment = commentRepository.save(comment);
			response.setDataObject(savedComment);
		} else {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("Failed to create attachment for uploaded file");
		}

		return response;
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Boolean> deleteCommentThumbnail(Comment comment, FileInfo thumbnail) {
		ServiceResponse<Boolean> response = new ServiceResponse<>();
		comment.getThumbnails().remove(thumbnail);
		genericDAO.persist(comment);
		genericDAO.remove(thumbnail);

		ServiceResponse<Boolean> fileDeleteResponse = fileService.deleteCommentThumbnail(thumbnail.getPath());
		if (fileDeleteResponse.getAckCode() == AckCodeType.FAILURE) {
			response.setAckCode(AckCodeType.FAILURE);
			response.setMessages(fileDeleteResponse.getMessages());
		} else {
			response.setDataObject(true);
		}

		return response;
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Boolean> deleteCommentAttachment(Comment comment, FileInfo attachment) {
		ServiceResponse<Boolean> response = new ServiceResponse<>();
		comment.getAttachments().remove(attachment);
		genericDAO.persist(comment);
		genericDAO.remove(attachment);

		ServiceResponse<Boolean> fileDeleteResponse = fileService.deleteCommentAttachment(attachment.getPath());
		if (fileDeleteResponse.getAckCode() == AckCodeType.FAILURE) {
			response.setAckCode(AckCodeType.FAILURE);
			response.setMessages(fileDeleteResponse.getMessages());
		} else {
			response.setDataObject(true);
		}

		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<List<Comment>> getLatestCommentsForUser(String username, int maxResult) {

		ServiceResponse<List<Comment>> response = new ServiceResponse<>();

		response.setDataObject(commentDAO.getLatestCommentsForUser(username, maxResult));

		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<Map<String, Integer>> getMostCommentsUsers(Date since, Integer maxResult) {

		ServiceResponse<Map<String, Integer>> response = new ServiceResponse<>();

		response.setDataObject(commentDAO.getMostCommentsUsers(since, maxResult));

		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<Boolean> isFirstComment(Comment comment) {

		ServiceResponse<Boolean> response = new ServiceResponse<>();
		Comment firstComment = commentRepository.findFirstCommentByDiscussion(comment.getDiscussion());
		response.setDataObject(firstComment.getId().equals(comment.getId()));

		return response;
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

}
