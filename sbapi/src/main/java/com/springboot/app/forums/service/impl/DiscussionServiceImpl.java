package com.springboot.app.forums.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.springboot.app.dto.response.PaginateResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.DiscussionDTO;
import com.springboot.app.forums.dto.UploadedFileData;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.CommentVote;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.DiscussionStat;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumStat;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.CommentVoteRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.service.DiscussionService;
import com.springboot.app.repository.CommentDAO;
import com.springboot.app.repository.DiscussionDAO;
import com.springboot.app.service.FileInfoHelper;
import com.springboot.app.service.FileService;

import lombok.extern.slf4j.Slf4j;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.TextExtractor;

@Service("discussionService")
@Slf4j
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

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private CommentVoteRepository commentVoteRepository;

	@Override
	@Transactional(readOnly = false)
	public ServiceResponse<Discussion> addDiscussion(Discussion newDiscussion, Comment comment, String username,
			List<UploadedFileData> thumbnailFiles, List<UploadedFileData> attachmentFiles) {
		ServiceResponse<Discussion> response = new ServiceResponse<>();
		comment.setTitle(newDiscussion.getTitle());
		comment.setCreatedBy(username);

		newDiscussion.setCreatedBy(username);

		// comment thumbnails
		comment.setThumbnails(fileInfoHelper.createThumbnails(thumbnailFiles));
		// comment attachments
		comment.setAttachments(fileInfoHelper.createAttachments(attachmentFiles));

		CommentVote commentVote = new CommentVote();
		commentVote.setCreatedBy(username);
		commentVote.setCreatedAt(LocalDateTime.now());
		commentVote = commentVoteRepository.save(commentVote);

		// Save the CommentVote
		comment.setCommentVote(commentVote); //

		newDiscussion.setComments(new ArrayList<>(List.of(comment)));

		discussionRepository.save(newDiscussion);
		comment.setDiscussion(newDiscussion);
		commentRepository.save(comment);
		// important, make sure to call this after comment is persisted

		// so all DB managed fields (id, createDate, ect) are available
		populateDiscussionStat(comment, newDiscussion, username);

		// populate forum stat
		ForumStat forumStat = populateForumStat(newDiscussion.getForum(), username, newDiscussion);
		newDiscussion.getForum().setStat(forumStat);

		Forum forum = newDiscussion.getForum();
		forum.getDiscussions().add(newDiscussion);
		forumRepository.save(forum);
		response.setDataObject(newDiscussion);
		return response;
	}

	private ForumStat populateForumStat(Forum forum, String username, Discussion discussion) {
		ForumStat forumStat = forum.getStat();
		forumStat.setCreatedBy(username);
		forumStat.setCreatedAt(LocalDateTime.now());
		forumStat.setDiscussionCount(forumStat.getDiscussionCount() + 1);
		forumStat.setCommentCount(forumStat.getCommentCount() + 1);
		forumStat.setLastComment(discussion.getStat().getLastComment());
		return forumStat;
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<DiscussionDTO> getById(Long id) {
		ServiceResponse<DiscussionDTO> response = new ServiceResponse<>();
		Discussion discussion = discussionRepository.findById(id).orElse(null);
		DiscussionDTO dto = modelMapper.map(discussion, DiscussionDTO.class);
		response.setDataObject(dto);
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
		String contentAbbr = contentAbbreviation.length() > 100 ? contentAbbreviation.substring(0, 97) + "..."
				: contentAbbreviation;

		lastComment.setContentAbbr(contentAbbr);
		lastComment.setCommentId(comment.getId());

		DiscussionStat discussionStat = discussion.getStat();
		discussionStat.setCreatedBy(username);
		discussionStat.setCreatedAt(LocalDateTime.now());
		discussionStat.setCommentors(new java.util.HashMap<>());
		discussionStat.setCommentCount(discussionStat.getCommentCount() + 1);
		discussionStat.setLastComment(lastComment);
		discussionStat.getCommentors().put(username, 1);
		discussionStat.setThumbnailCount(comment.getThumbnails().size());
		discussionStat.setAttachmentCount(comment.getAttachments().size());

		// note: no need to merge in case of update
		return discussionStat;
	}

	@Override
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
		 * add a hook to transaction callback to remove files if transaction success
		 * (committed)
		 */
		TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
			@Override
			public void afterCompletion(int status) {
				if (status == TransactionSynchronization.STATUS_COMMITTED) {
					for (String path : thumbnailPaths) {
						fileService.deleteCommentThumbnail(path);
					}
					for (String path : attachmentPaths) {
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

		if (fromForum != null) {
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
		for (Discussion d : discussions) {
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

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<List<DiscussionDTO>> getDiscussionsByForum(Long id) {
		ServiceResponse<List<DiscussionDTO>> response = new ServiceResponse<>();
		List<Discussion> discussions = discussionRepository.findDiscussionByForumId(id);
		log.info("Discussions found: {}", discussions.size());
		List<DiscussionDTO> dtos = new ArrayList<>();
		for (Discussion d : discussions) {
			dtos.add(modelMapper.map(d, DiscussionDTO.class));
		}
		response.setDataObject(dtos);
		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<List<DiscussionDTO>> getAllDiscussions() {
		ServiceResponse<List<DiscussionDTO>> response = new ServiceResponse<>();
		List<Discussion> discussions = discussionRepository.findAll();
		List<DiscussionDTO> dtos = new ArrayList<>();
		for (Discussion d : discussions) {
			dtos.add(modelMapper.map(d, DiscussionDTO.class));
		}
		response.setDataObject(dtos);
		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<Discussion> getDiscussionsById(Long id) {
		ServiceResponse<Discussion> response = new ServiceResponse<>();
		Discussion discussion = discussionRepository.findById(id).orElse(null);
		response.setDataObject(discussion);
		return response;
	}

	@Override
	@Transactional(readOnly = true)
	public PaginateResponse getAllDiscussion(int pageNo, int pageSize, String orderBy, String sortDir, String keyword,
			Long forumId) {
		Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
				: Sort.by(orderBy).descending();

		// create Pageable instance
		Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
		// get the list of users from the UserRepository and return it as a Page object
		Page<Discussion> discussionPage = discussionRepository.searchByTitle(keyword, forumId, pageable);

		// map the list of discussions to list of DiscussionDTO
		Page<DiscussionDTO> discussionDTOPage = discussionPage
				.map(discussion -> modelMapper.map(discussion, DiscussionDTO.class));

		return new PaginateResponse(discussionDTOPage.getNumber() + 1, discussionDTOPage.getSize(),
				discussionDTOPage.getTotalPages(), discussionDTOPage.getContent().size(), discussionDTOPage.isLast(),
				discussionDTOPage.getContent());
	}

}
