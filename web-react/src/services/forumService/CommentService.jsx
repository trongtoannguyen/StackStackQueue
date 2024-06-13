import axios from "../customize-axios";
const getAllComments = async () => {
	return await axios.get("/view/discussions/comments");
};

const createComment = async (
	discussionId,
	comment,
	replyToId,
	accessToken,
	axiosJWT
) => {
	const res = await axiosJWT.post(
		"/comments/add",
		{
			discussionId,
			comment,
			replyToId,
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

export { getAllComments, createComment };
