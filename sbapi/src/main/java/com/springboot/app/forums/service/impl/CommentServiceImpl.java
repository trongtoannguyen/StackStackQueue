package com.springboot.app.forums.service.impl;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.DiscussionDTO;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.CommentVote;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.DiscussionStat;
import com.springboot.app.forums.entity.FileInfo;
import com.springboot.app.forums.entity.Forum;
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

		response.setDataObject(commentDAO.isFirstComment(comment));

		return response;
	}

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Comment> addComment(Long discussionId, Comment comment, String username,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles) {
		ServiceResponse<Comment> response = new ServiceResponse<>();

		ServiceResponse<DiscussionDTO> discussion = discussionService.getById(discussionId);

		Discussion discussionEntity = modelMapper.map(discussion.getDataObject(), Discussion.class);

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

		// Save the Forum
		Forum forum = discussionEntity.getForum();
		forum.getDiscussions().add(discussionEntity);
		forumRepository.save(forum);

		response.setDataObject(comment);
		return response;
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
