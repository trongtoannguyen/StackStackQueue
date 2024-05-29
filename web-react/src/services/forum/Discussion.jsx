import axios from "../customize-axios";

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
	return await axios.get("/view/discussions/all");
};

const getDiscussionById = async (id) => {
	return await axios.get(`/view/discussions/byId/${id}`);
};

export {
	createDiscussion,
	getAllDiscussion,
	updateDiscussion,
	getDiscussionById,
};
