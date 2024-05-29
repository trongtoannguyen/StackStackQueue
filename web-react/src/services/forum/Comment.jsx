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

export { createComment };
