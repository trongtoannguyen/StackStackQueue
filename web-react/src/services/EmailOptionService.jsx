
export const getEmailOptionById = async (accessToken, axiosJWT) => {
  return await axiosJWT.get(`admin/email-manage`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const putUpdateEmailOption = async (emailOption, accessToken, axiosJWT) => {
  return await axiosJWT.put(`admin/email-manage/update`, emailOption, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const postCreateEmailOption = async (emailOption, accessToken, axiosJWT) => {
  return await axiosJWT.post(`admin/email-manage/add`, emailOption, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
