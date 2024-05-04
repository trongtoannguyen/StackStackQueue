package com.springboot.app.tags;

import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.service.SystemInfoService;
import com.springboot.app.repository.DiscussionDAO;
import com.springboot.app.repository.GenericDAO;
import com.springboot.app.search.SortSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class TagServiceImpl implements TagService {

	@Autowired
	private TagRepository tagRepository;

	@Autowired
	private GenericDAO genericDAO;

	@Autowired
	private SystemInfoService systemInfoService;
	@Autowired
	private DiscussionDAO discussionDAO;

	@Transactional(readOnly = false)
	public ServiceResponse<Long> createNewTag(Tag newTag){
		ServiceResponse<Long> response = new ServiceResponse<>();

		Integer maxSortOrder = genericDAO.getMaxNumber(Tag.class, "sortOrder", null).intValue();

		newTag.setSortOrder(maxSortOrder + 1);

		tagRepository.save(newTag);

		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.addTagCount(1);

		response.setDataObject(newTag.getId());

		return response;
	}

	@Transactional(readOnly = false)
	public ServiceResponse<Void> deleteTag(Tag tagToDelete) {
		ServiceResponse<Void> response = new ServiceResponse<>();

		tagRepository.delete(tagToDelete);

		SystemInfoService.Statistics systemStat = systemInfoService.getStatistics().getDataObject();
		systemStat.addTagCount(-1);

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<List<Tag>> getActiveTags(){
		ServiceResponse<List<Tag>> response = new ServiceResponse<>();

		List<Tag> tags = genericDAO.getEntities(Tag.class,
				Collections.singletonMap("disabled", Boolean.FALSE),
				new SortSpec("sortOrder", SortSpec.Direction.DESC));
		response.setDataObject(tags);

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<List<Discussion>> getDiscussionsByTag(Tag tag, int size){
		ServiceResponse<List<Discussion>> response = new ServiceResponse<>();

		List<Discussion> discussions = discussionDAO.findByTag(tag, 0, size, null, null);
		response.setDataObject(discussions);

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<List<Discussion>> getDiscussionsByTag(Tag tag, int startPosition,
	                                                             int maxResult, String sortField, Boolean descending){
		ServiceResponse<List<Discussion>> response = new ServiceResponse<>();

		List<Discussion> discussions = discussionDAO.findByTag(tag, startPosition, maxResult, sortField, descending);
		response.setDataObject(discussions);

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<Long> countCommentsForTag(Tag tag){
		ServiceResponse<Long> response = new ServiceResponse<>();

		Number count = discussionDAO.countCommentsForTag(tag);
		response.setDataObject(count.longValue());

		return response;
	}

	@Transactional(readOnly = true)
	public ServiceResponse<Long> countDiscussionsForTag(Tag tag){
		ServiceResponse<Long> response = new ServiceResponse<>();

		Number count = discussionDAO.countDiscussionsForTag(tag);
		response.setDataObject(count.longValue());

		return response;
	}

	public ServiceResponse<CommentInfo> getLatestCommentInfoForTag(Tag tag){
		ServiceResponse<CommentInfo> response = new ServiceResponse<>();

		CommentInfo commentInfo = discussionDAO.getLatestCommentInfoForTag(tag);
		response.setDataObject(commentInfo);

		return response;
	}


}
