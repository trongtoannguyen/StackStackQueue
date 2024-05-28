import axios from "./customize-axios";

const getAllForum = async () => {
	return await axios.get("/forums/get-all-forum");
};

const getAllForumGroup = async () => {
	return await axios.get("/forums/get-child-forums-and-forum-groups");
};

const addForumGroup = async (newForumGroup, accessToken, axiosJWT) => {
	const res = await axiosJWT.post("/admin/forum-groups", newForumGroup, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	//
	return res;
};

const updateForumGroup = async (id, forumGroup, accessToken, axiosJWT) => {
	const res = await axiosJWT.put(
		`/admin/forum-groups/update/${id}`,
		forumGroup,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	//
	return res;
};

const deleteForumGroup = async (id, accessToken, axiosJWT) => {
	const res = await axiosJWT.delete(`/admin/forum-groups/delete/${id}`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	//
	return res;
};

const addForum = async (forum, accessToken, axiosJWT) => {
	const res = await axiosJWT.post("/admin/forums", forum, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	//
	return res;
};

const updateForum = async (id, forum, accessToken, axiosJWT) => {
	const res = await axiosJWT.patch(`/admin/forums/update/${id}`, forum, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`,
		},
	});
	//
	return res;
};

const getForumById = async (id) => {
	return await axios.get(`/forums/get-by-id/${id}`);
};

const createDiscussion = async (
	forumId,
	discussion,
	content,
	accessToken,
	axiosJWT
) => {
	const res = await axiosJWT.post(
		"/discussions/add",
		{
			forumId,
			discussion,
			content,
		},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	//
	return res;
};

const updateDiscussion = async (
	id,
	forumId,
	discussion,
	content,
	accessToken,
	axiosJWT
) => {
	const res = await axiosJWT.put(
		`/discussions/update/${id}`,
		{
			forumId,
			discussion,
			content,
		},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	//
	return res;
};

const getAllDiscussion = async () => {
	return await axios.get("/discussions/all");
};

const getDiscussionById = async (id) => {
	return await axios.get(`/discussions/byId/${id}`);
};

const createComment = async (discussionId, comment, accessToken, axiosJWT) => {
	const res = await axiosJWT.post(
		"/comments/add",
		{
			discussionId,
			comment,
		},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	//
	return res;
};

export {
	getAllForum,
	getAllForumGroup,
	addForumGroup,
	updateForumGroup,
	deleteForumGroup,
	addForum,
	updateForum,
	getForumById,
	createDiscussion,
	getAllDiscussion,
	updateDiscussion,
	getDiscussionById,
	createComment,
};
