import axios from './customize-axios';

import { pathParams } from '../utils/Helper';

export const getAllUsers = async (pageData, axiosJWT, accessToken) => {
  try {
    let path = pathParams(pageData);
    let res = await axiosJWT.get(`admin/users?${path}`,{
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
}


const fetchAllUser = async (page) => {
  return await axios.get(`users?page=${page}`);
}

const postCreateUser = async (name, job) => {
  return await axios.post("users", { name, job });
}

const putUpdateUser = async (id, name, job) => {
  return await axios.put(`users/${id}`, { name, job });
}

const deleteUser = async (id) => {
  return await axios.delete(`users/${id}`);
}


export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser}