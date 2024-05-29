import axios from "../customize-axios";

const getAllForum = async () => {
	return await axios.get("/view/forums/get-all-forum");
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
	return await axios.get(`/view/forums/get-by-id/${id}`);
};

export { getAllForum, addForum, updateForum, getForumById };
