package com.springboot.app.forums.service;


import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.forums.entity.ForumStat;
import com.springboot.app.forums.repository.ForumGroupRepository;
import com.springboot.app.forums.repository.ForumRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service("forumService")
@Transactional
public class ForumServiceImpl implements ForumService {
	private static final Logger logger = LoggerFactory.getLogger(ForumServiceImpl.class);

	@Autowired
	private ForumGroupRepository forumGroupRepository;

	@Autowired
	private ForumRepository forumRepository;

	@Autowired
	private DiscussionRepository discussionRepository;

	@Autowired
	private SystemInfoService systemInfoService;

	private List<ForumGroup> topLevelForumGroups;

	@Override
	public ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> getChildForumsAndForumGroups(ForumGroup forumGroup) {
		ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> response = new ServiceResponse<>();
		return response;
	}

	@Override
	public ServiceResponse<ForumGroup> addForumGroup(ForumGroup newForumGroup, ForumGroup parent) {
		ServiceResponse<ForumGroup> response = new ServiceResponse<>();
		Integer maxSortOrder = forumGroupRepository.findMaxSortOrderByParent(parent);

		newForumGroup.setSortOrder(maxSortOrder + 1);
		newForumGroup.setParent(parent);
		forumGroupRepository.save(newForumGroup);
		response.setDataObject(newForumGroup);

		if(parent != null) {
			parent.getSubGroups().add(newForumGroup);
			forumGroupRepository.save(parent);
		}

		return null;
	}

	@Override
	public ServiceResponse<Void> deleteForumGroup(ForumGroup forumGroup) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		// reset all discussions to the root forum group
		resetDiscussions(forumGroup);

		ForumGroup parentGroup = forumGroup.getParent();
		if(parentGroup != null) {
			parentGroup.getSubGroups().remove(forumGroup);
			forumGroupRepository.save(parentGroup);
		}
		// delete the forum group and its subgroups recursively
		forumGroupRepository.delete(forumGroup);
		// reset forum count
		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.setForumCount(forumGroupRepository.countForums().longValue());

		return response;
	}

	/**
	 * Reset all discussions to the root forum group and delete the forum group
	 * and its subgroups recursively from the root forum group repository and database
	 * helper method for deleteForumGroup
	 * @param forumGroup
	 */
	public void resetDiscussions(ForumGroup forumGroup) {
		for(Forum forum : forumGroup.getForums()) {
			discussionRepository.moveDiscussion(forum, null);
		}
		for(ForumGroup subGroup : forumGroup.getSubGroups()) {
			resetDiscussions(subGroup);
		}
	}

	@Override
	public ServiceResponse<Forum> addForum(Forum newForum, ForumGroup forumGroup) {
		ServiceResponse<Forum> response = new ServiceResponse<>();
		Integer maxSortOrder = forumGroupRepository.findMaxSortOrderByParent(forumGroup);

		newForum.setSortOrder(maxSortOrder + 1);
		newForum.setActive(true);
		newForum.setStat(new ForumStat());
		newForum.setForumGroup(forumGroup);

		forumGroupRepository.save(forumGroup);
		response.setDataObject(newForum);

		if(forumGroup != null) {
			forumGroup.getForums().add(newForum);
			forumGroupRepository.save(forumGroup);
		}

		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.addForumCount(1);

		return response;
	}

	@Override
	public ServiceResponse<Void> deleteForum(Forum forum) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		//set discussion's reference to forum to null
		discussionRepository.moveDiscussion(forum, null);

		ForumGroup forumGroup = forum.getForumGroup();
		if(forumGroup != null) {
			forumGroup.getForums().remove(forum);
			forumGroupRepository.save(forumGroup);
		}
		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.addForumCount(-1);

		//delete the forum
		forumRepository.delete(forum);

		return response;
	}


}
