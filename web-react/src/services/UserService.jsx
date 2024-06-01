
import { API_BASE_URL } from "../constants";
import { pathParams } from '../utils/Helper';

export const getAllUsers = async (pageData, axiosJWT, accessToken) => {
  try {
    let path = pathParams(pageData);
    let res = await axiosJWT.get(`admin/users?${path}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const getUserInfoByUsername = async (username, axiosJWT, accessToken) => {
  try {
    let res = await axiosJWT.get(`admin/users/account/${username}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

// use in adminPage/userManage
export const patchUpdateStatusUser = async (id, status, axiosJWT, accessToken) => {
  return await axiosJWT.patch(`admin/users/status/${id}?status=${status}`, { status }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

// use in adminPage/userManage
export const deleteUser = async (accessToken, id, axiosJWT) => {
  try {
    let res = await axiosJWT.delete(`admin/users/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//use in profilePage
export const getAccountInfoByUsername = async (username, axiosJWT, accessToken) => {
  try {
    let res = await axiosJWT.get(`account-info/account/${username}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//use in profilePage: edit info
export const postUpdateInfo = async (accessToken, axiosJWT, data) => {
  try {
    let res = await axiosJWT.put(`account-info/update-info/${data.username}`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//use in profilePage
export const postFollow = async (accessToken, axiosJWT, data) => {
  try {
    let res = await axiosJWT.post(`users/followed`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//use in profilePage
export const postUnFollow = async (accessToken, axiosJWT, data) => {
  try {
    let res = await axiosJWT.post(`users/un-followed`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

//use in profilePage
export const postUploadAvatar = async (accessToken, axiosJWT, data, username) => {
  try {
    return await axiosJWT.post(`account-info/update-avatar?username=${username}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    console.error("Error upload avatar", JSON.stringify(err.message));
  }
}

export const fetchImage = (filename)=> {
  return `${API_BASE_URL}/api/user-stat/images/${filename}`;
}


export const fetchAvatarByUsername = (username) => {
  return `${API_BASE_URL}/api/user-stat/images/avatar/${username}`;
}

