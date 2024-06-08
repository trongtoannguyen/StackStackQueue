export const getUsersCount = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getActiveUsersCount = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/active-users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export const getInactiveUsersCount = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/inactive-users`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export const getDiscussionCount = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/discussions`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export const getCommentCount = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/dashboard/comments`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}