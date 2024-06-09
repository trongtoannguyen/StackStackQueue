//use in badge manage page


export const getAllBadge = async (accessToken, axiosJWT) => {
  return await axiosJWT.get("admin/badges", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

//update badge
export const putUpdateBadge = async (badge, accessToken, axiosJWT) => {
  return await axiosJWT.put(`admin/badges/update/${badge.id}`, badge, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

//set badge for all user
export const setBadgeForAllUser = async (accessToken, axiosJWT) => {
  return await axiosJWT.get("admin/badges/set-all-user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
