package com.springboot.app.forums.service;

import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.DiscussionStat;
import com.springboot.app.forums.repository.CommentInfoRepository;
import com.springboot.app.forums.repository.CommentRepository;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumStat;
import com.springboot.app.forums.repository.ForumStatRepository;
import com.springboot.app.repository.StatDAO;
import net.htmlparser.jericho.Source;
import net.htmlparser.jericho.TextExtractor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Stream;

@Service("forumStatService")
public class StatServiceImpl implements StatService {

	@Autowired
	private CommentRepository commentRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private CommentInfoRepository commentInfoRepository;
	@Autowired
	private ForumStatRepository forumStatRepository;

	@Autowired
	private StatDAO statDAO;

	@Transactional(readOnly = false)
	public ServiceResponse<Map<String,Integer>> getMostVotedUpUsers(LocalDateTime sinceDate, Integer limit) {
		ServiceResponse<Map<String,Integer>> response = new ServiceResponse<>();
		response.setDataObject(statDAO.getMostVotedUpUsers(sinceDate, limit));
		return response;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRED)
	public ServiceResponse<ForumStat> synchForumStat(Forum forum) {
		ServiceResponse<ForumStat> response = new ServiceResponse<>();
		response.setDataObject(refreshForumStatFromDB(forum));
		return response;
	}

	public ForumStat refreshForumStatFromDB(Forum forum) {
		ForumStat forumStat = forum.getStat();
		forumStat.setDiscussionCount(forum.getDiscussions().size());
		forumStat.setCommentCount(commentRepository.countComment(forum).longValue());

		Comment lastComment = commentRepository.findLatestComment(forum);
		CommentInfo lastCommentInfo = discussionRepository.latestCommentInfo(forum);

		if (lastComment != null) {
			// has comment
			if (lastCommentInfo == null){
				lastCommentInfo = new CommentInfo();
				commentInfoRepository.save(lastCommentInfo);
				forumStat.setLastComment(lastCommentInfo);
			}
			copyToCommentInfo(lastComment, lastCommentInfo);

		} else{
			// no comment
			if (lastCommentInfo != null) {
				// remove last comment info if no comment
				forumStat.setLastComment(null);
				commentInfoRepository.save(lastCommentInfo);
			}
		}
		forumStatRepository.save(forumStat);
		return forumStat;
	}

	@Transactional(readOnly = false)
	public ServiceResponse<Void> synchDiscussionStart(){
		ServiceResponse<Void> response = new ServiceResponse<>();

		try(Stream<Discussion> discussionStream = discussionRepository.findAll().stream()){
			discussionStream.forEach(discussion -> {
				refreshDiscussionStatFromDB(discussion);
			});
		}
		return response;

	}

	private DiscussionStat refreshDiscussionStatFromDB(Discussion discussion) {
		DiscussionStat discussionStat = discussion.getStat();

		discussionStat.setCommentCount(statDAO.countCommentByDiscussion(discussion).longValue());
		// refresh commenter map
		discussion.getStat().setCommentors(statDAO.getCommentorMap(discussion));

		Comment lastComment = statDAO.findLatestCommentByDiscussion(discussion);
		CommentInfo commentInfo = discussionStat.getLastComment();

		copyToCommentInfo(lastComment, commentInfo);

		discussionStat.setThumbnailCount(statDAO.countThumbnailsByDiscussion(discussion).longValue());
		discussionStat.setAttachmentCount(statDAO.countAttachmentsByDiscussion(discussion).longValue());


		return discussionStat;
	}

	private void copyToCommentInfo(Comment comment, CommentInfo commentInfo ) {
		commentInfo.setCommenter(comment.getCreatedBy());
		commentInfo.setCommentId(comment.getId());
		commentInfo.setCommentDate(comment.getCreatedAt());
		commentInfo.setTitle(comment.getTitle());

		String contentAbbr = new TextExtractor(new Source(comment.getContent())).toString();
		commentInfo.setContentAbbr(contentAbbr.length() > 100 ? contentAbbr.substring(0, 97) : contentAbbr);
	}
}
