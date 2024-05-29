import axios from "../customize-axios";

const getAllForumGroup = async () => {
	return await axios.get("/view/forums/get-child-forums-and-forum-groups");
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

export { getAllForumGroup, addForumGroup, updateForumGroup, deleteForumGroup };
