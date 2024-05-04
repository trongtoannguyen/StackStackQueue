package com.springboot.app.forums.service.impl;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.*;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.service.DiscussionService;
import com.springboot.app.repository.CommentDAO;
import com.springboot.app.repository.DiscussionDAO;
import com.springboot.app.service.FileInfoHelper;
import com.springboot.app.service.FileService;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.TextExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class DiscussionServiceImpl implements DiscussionService {

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private ForumRepository forumRepository;
	@Autowired
	private CommentDAO commentDAO;

	@Autowired
	private DiscussionDAO discussionDAO;

	@Autowired
	private FileInfoHelper fileInfoHelper;

	@Autowired
	private FileService fileService;

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Discussion> addDiscussion(
			Discussion newDiscussion, Comment comment, String username,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles
	) {
		ServiceResponse<Discussion> response = new ServiceResponse<>();

		comment.setTitle(newDiscussion.getTitle());
		comment.setCreatedBy(username);
		comment.setUpdatedBy(username);

		newDiscussion.setCreatedBy(username);
		newDiscussion.setUpdatedBy(username);

		//comment thumbnails
		comment.setThumbnails(fileInfoHelper.createThumbnails(thumbnailFiles));
		//comment attachments
		comment.setAttachments(fileInfoHelper.createAttachments(attachmentFiles));

		comment.setCommentVote(new CommentVote());

		newDiscussion.setComments(new ArrayList<>(List.of(comment)));

		discussionRepository.save(newDiscussion);

		comment.setDiscussion(newDiscussion);
		commentRepository.save(comment);

		// important, make sure to call this after comment is persisted
		// so all DB managed fields (id, createDate, ect) are available
		populateDiscussionStat(comment, newDiscussion, username);

		Forum forum = newDiscussion.getForum();
		forum.getDiscussions().add(newDiscussion);
		forumRepository.save(forum);


		response.setDataObject(newDiscussion);
		return response;
	}


	private DiscussionStat populateDiscussionStat(Comment comment, Discussion discussion, String username) {
		// populate discussion stat
		CommentInfo lastComment = new CommentInfo();
		lastComment.setCreatedBy(username);
		lastComment.setCommenter(username);
		lastComment.setCommentDate(comment.getCreatedAt());
		lastComment.setTitle(comment.getTitle());

		String contentAbbreviation = new TextExtractor(new Source(comment.getContent())).toString();
		String contentAbbr= contentAbbreviation.length() > 100
				? contentAbbreviation.substring(0, 97)+"..."
				: contentAbbreviation;

		lastComment.setContentAbbr(contentAbbr);
		lastComment.setCommentId(comment.getId());

		DiscussionStat discussionStat = discussion.getStat();
		discussionStat.setCommentors(new java.util.HashMap<>());
		discussionStat.setCommentCount(1);
		discussionStat.setLastComment(lastComment);
		discussionStat.getCommentors().put(username, 1);
		discussionStat.setThumbnailCount(comment.getThumbnails().size());
		discussionStat.setAttachmentCount(comment.getAttachments().size());
		//note: no need to merge in case of update
		return discussionStat;
	}

	@Transactional(readOnly = false)
	public ServiceResponse<Void> deleteDiscussion(Discussion discussion) {
		ServiceResponse<Void> response = new ServiceResponse<>();

		Forum forum = discussion.getForum();
		forum.getDiscussions().remove(discussion);
		forum.getStat().setLastComment(null);
		forumRepository.save(forum);

		// delete attachments and thumbnails
		List<String> attachmentPaths = commentDAO.getAttachmentPathsForDiscussion(discussion);
		List<String> thumbnailPaths = commentDAO.getThumbnailPathsForDiscussion(discussion);

		/*
		 * add a hook to transaction callback to remove files if transaction success (committed)
		 */
		TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
			@Override
			public void afterCompletion(int status) {
				if(status == TransactionSynchronization.STATUS_COMMITTED) {
					for(String path : thumbnailPaths) {
						fileService.deleteCommentThumbnail(path);
					}
					for(String path : attachmentPaths) {
						fileService.deleteCommentAttachment(path);
					}
				}
			}
		});

		discussionRepository.delete(discussion);

		return response;
	}

	@Transactional(readOnly = false)
	public ServiceResponse<Void> assignNewForum(Discussion discussion, Forum toForum) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		Forum fromForum = discussion.getForum();

		discussion.setForum(toForum);
		discussionRepository.save(discussion);

		toForum.getDiscussions().add(discussion);
		forumRepository.save(toForum);

		if(fromForum != null) {
			fromForum.getDiscussions().remove(discussion);
//			fromForum.getStat().setLastComment(null);
			forumRepository.save(fromForum);
		}

		return response;
	}

	@Transactional(readOnly = true)
//	@Cacheable(value=CachingConfig.DISCCUSIONS, key="{'discussionService.getLatestDiscussions', #maxResult}")
	public ServiceResponse<List<Discussion>> getLatestDiscussions(Integer maxResult) {

		ServiceResponse<List<Discussion>> response = new ServiceResponse<>();

		response.setDataObject(discussionDAO.getLatestDiscussions(maxResult));

		return response;
	}
	@Transactional(readOnly = true)
//	@Cacheable(value=CachingConfig.DISCCUSIONS, key="{'discussionService.getMostViewsDiscussions', #daysBack, #maxResult}")
	public ServiceResponse<List<Discussion>> getMostViewsDiscussions(Integer daysBack, Integer maxResult) {

		ServiceResponse<List<Discussion>> response = new ServiceResponse<>();

		LocalDateTime since = LocalDateTime.now().minusDays(daysBack);

		response.setDataObject(discussionDAO.getMostViewsDiscussions(since, maxResult));

		return response;
	}

	@Transactional(readOnly = true)
//	@Cacheable(value=CachingConfig.DISCCUSIONS, key="{'discussionService.getMostCommentsDiscussions', #daysBack, #maxResult}")
	public ServiceResponse<List<Discussion>> getMostCommentsDiscussions(Integer daysBack, Integer maxResult) {

		ServiceResponse<List<Discussion>> response = new ServiceResponse<>();

		LocalDateTime since = LocalDateTime.now().minusDays(daysBack);
		response.setDataObject(discussionDAO.getMostCommentsDiscussions(since, maxResult));

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<List<String>> getCommentors(Discussion discussion) {

		ServiceResponse<List<String>> response = new ServiceResponse<>();

		response.setDataObject(commentDAO.getCommentorsForDiscussion(discussion));

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<List<Discussion>> fetchDiscussions(List<Discussion> discussions) {

		ServiceResponse<List<Discussion>> response = new ServiceResponse<>();

		List<Long> discussionIds = new ArrayList<>();
		for(Discussion d : discussions) {
			discussionIds.add(d.getId());
		}

		response.setDataObject(discussionDAO.fetch(discussionIds));

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<Map<String, Integer>> getMostDiscussionUsers(LocalDateTime since, Integer maxResult) {

		ServiceResponse<Map<String, Integer>> response = new ServiceResponse<>();

		response.setDataObject(discussionDAO.getMostDiscussionUsers(since, maxResult));

		return response;
	}







}
