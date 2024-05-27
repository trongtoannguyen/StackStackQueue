// import axios from './customize-axios';

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

export const patchUpdateStatusUser = async (id, status, axiosJWT, accessToken) => {
  return await axiosJWT.patch(`admin/users/status/${id}`, { status }, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

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

export const postFollow = async (accessToken, axiosJWT, data) => {
  try {
    let res = await axiosJWT.post(`admin/users/followed`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const postUnFollow = async (accessToken, axiosJWT, data) => {
  try {
    let res = await axiosJWT.post(`admin/users/un-followed`, data, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

