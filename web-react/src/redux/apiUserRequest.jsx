import {
  deleteUserFailed,
  deleteUsersSuccess,
  deleteUserStart,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
} from "./userSlice";

import { pathParams } from '../utils/Helper';


export const getAllUsers = async (accessToken, dispatch, axiosJWT, pageData) => {
  dispatch(getUsersStart());
  try {
    let path = pathParams(pageData);
    let res = await axiosJWT.get(`admin/users?${path}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      withCredentials: true
    });
    dispatch(getUsersSuccess(res.data));
    return res.data;
  } catch (err) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id, axiosJWT) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete("/users/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUsersSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};

