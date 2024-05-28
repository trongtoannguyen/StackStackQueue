package com.springboot.app.forums.service.impl;

import java.util.AbstractMap;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.dto.ForumDTO;
import com.springboot.app.forums.dto.ForumGroupDTO;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.entity.ForumGroup;
import com.springboot.app.forums.entity.ForumStat;
import com.springboot.app.forums.repository.DiscussionRepository;
import com.springboot.app.forums.repository.ForumGroupRepository;
import com.springboot.app.forums.repository.ForumRepository;
import com.springboot.app.forums.service.ForumService;
import com.springboot.app.forums.service.SystemInfoService;
import com.springboot.app.repository.GenericDAO;

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

	@Autowired
	private GenericDAO genericDAO;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	@Transactional(readOnly = true)
	public ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> getChildForumsAndForumGroups(
			ForumGroup forumGroup) {
		ServiceResponse<Map.Entry<List<Forum>, List<ForumGroup>>> response = new ServiceResponse<>();

		List<Forum> forums = genericDAO.getEntities(Forum.class, Collections.singletonMap("forumGroup", forumGroup));

		List<ForumGroup> forumGroups = genericDAO.getEntities(ForumGroup.class,
				Collections.singletonMap("parent", forumGroup));

		AbstractMap.SimpleEntry<List<Forum>, List<ForumGroup>> dataObject = new AbstractMap.SimpleEntry<List<Forum>, List<ForumGroup>>(
				forums, forumGroups);

		response.setDataObject(dataObject);
		return response;
	}

	private ForumGroupDTO convertToDTO(ForumGroup forumGroup) {
		return modelMapper.map(forumGroup, ForumGroupDTO.class);
	}

	private ForumDTO convertToDTO(Forum forum) {
		return modelMapper.map(forum, ForumDTO.class);
	}

	@Override
	@Transactional(readOnly = true)
	public List<ForumGroupDTO> getChildForumsAndForumGroups() {
		List<ForumGroup> topLevelForumGroups = forumGroupRepository.findByParentIsNull();
		return topLevelForumGroups.stream().map(this::convertToDTO).collect(Collectors.toList());
	}

	@Override
	public List<ForumDTO> getAllForum() {
		List<Forum> forumGroups = genericDAO.findAll(Forum.class);
		List<ForumDTO> dto = forumGroups.stream().map(this::convertToDTO).collect(Collectors.toList());
		// set idForumGorum for forum = id of forum group
		for (ForumDTO forumDTO : dto) {
			forumDTO.setIdForumGroup(forumDTO.getForumGroup().getId());
		}
		return dto;
	}

	@Override
	public ServiceResponse<Void> deleteForumGroup(ForumGroup forumGroup) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		// reset all discussions to the root forum group
		resetDiscussions(forumGroup);

		ForumGroup parentGroup = forumGroup.getParent();
		if (parentGroup != null) {
			parentGroup.getSubGroups().remove(forumGroup);
			forumGroupRepository.save(parentGroup);
		}
		// delete the forum group and its subgroups recursively
		forumGroupRepository.delete(forumGroup);

		return response;
	}

	public void resetDiscussions(ForumGroup forumGroup) {
		for (Forum forum : forumGroup.getForums()) {
			discussionRepository.moveDiscussion(forum, null);
		}
		for (ForumGroup subGroup : forumGroup.getSubGroups()) {
			resetDiscussions(subGroup);
		}
	}

	@Override
	public ServiceResponse<ForumDTO> addForum(Forum newForum, ForumGroup forumGroup) {
		ServiceResponse<ForumDTO> response = new ServiceResponse<>();

		Integer maxSortOrder = forumRepository.findTopBySortOrderForForum(forumGroup.getId());

		newForum.setSortOrder(maxSortOrder + 1);
		newForum.setActive(true);
		newForum.setStat(new ForumStat());
		newForum.setForumGroup(forumGroup);

		newForum = genericDAO.merge(newForum);
		// map newForum to ForumDTO
		ForumDTO newForumDTO = convertToDTO(newForum);
		response.setDataObject(newForumDTO);
		return response;
	}

	@Override
	public ServiceResponse<Void> deleteForum(Forum forum) {
		ServiceResponse<Void> response = new ServiceResponse<>();
		// set discussion's reference to forum to null
		discussionRepository.moveDiscussion(forum, null);

		ForumGroup forumGroup = forum.getForumGroup();
		if (forumGroup != null) {
			forumGroup.getForums().remove(forum);
			forumGroupRepository.save(forumGroup);
		}
		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.addForumCount(-1);

		// delete the forum
		forumRepository.delete(forum);

		return response;
	}

	@Override
	public ServiceResponse<ForumGroup> addForumGroup(ForumGroup newForumGroup, ForumGroup parent) {

		ServiceResponse<ForumGroup> response = new ServiceResponse<>();
//		Integer maxSortOrder = forumGroupRepository.findMaxSortOrderByParent(parent);
//		Integer maxSortOrder = genericDAO
//				.getMaxNumber(ForumGroup.class, "sortOrder", Collections.singletonMap("parent", parent)).intValue();

		Integer maxSortOrder = forumRepository.findTopBySortOrder();
		newForumGroup.setSortOrder(maxSortOrder + 1);

		newForumGroup.setParent(null);
		forumGroupRepository.save(newForumGroup);
		response.setDataObject(newForumGroup);

		if (parent != null) {
			parent.getSubGroups().add(newForumGroup);
			forumGroupRepository.save(parent);
		}

		// increment forum group count
		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.addForumGroupCount(1);

		return response;
	}

	@Override
	public ServiceResponse<ForumDTO> getById(Forum forum) {
		ServiceResponse<ForumDTO> response = new ServiceResponse<>();
		ForumDTO forumDTO = convertToDTO(forum);
		response.setDataObject(forumDTO);
		return response;
	}
}
