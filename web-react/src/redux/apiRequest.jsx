// import axios from "axios";
import axios from "../services/customize-axios";
// import { loginApi } from "../services/AuthService";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";

import { toast } from 'react-toastify';

export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    let res = await axios.post('auth/signin', user);
    if (res?.accessToken) {
      toast.success("Login successfully!");
      dispatch(loginSuccess(res));
    } else if (+res?.data?.status === 500) {
      toast.error("Username or password incorrect!");
      dispatch(loginFailed());
    }
  } catch (err) {
    toast.error(err.data.message);
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    let res = await axios.post("/auth/signup", user);
    console.log(`Here is the response: ${JSON.stringify(res)}`);
    console.log(`Here is the status: ${+res?.status}`);
    if (+res?.status === 201) {
      dispatch(registerSuccess());
      navigate("/login");
      toast.success("Register successfully!");
    } else if (+res?.data?.status === 400) {
      toast.error(res?.data?.message);
      dispatch(registerFailed());
    }
  } catch (err) {
    toast.error(err?.data?.message);
    dispatch(registerFailed());
  }
};


export const logOut = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logOutStart());
  try {
    await axiosJWT.post("/auth/signout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logOutSuccess());
    navigate("/login");
    toast.success("Logout Successfully!");
  } catch (err) {
    console.log(`Here is the error: ${err}`);
    toast.error("Log out failed!");
    dispatch(logOutFailed());
  }
};


export const getCurrentUser = async (dispatch, accessToken) => {
  dispatch(loginStart());
  try {
    const res = await axios.get("/auth/user/me", {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
    });
    if (res?.accessToken) {
      // toast.success("Login successfully!");
      dispatch(loginSuccess(res));
    } else if (+res?.data?.status === 500) {
      toast.error(res.data?.message);
      dispatch(loginFailed());
    }
  } catch (err) {
    toast.error(err?.data?.message);
    dispatch(loginFailed());
  }

};

