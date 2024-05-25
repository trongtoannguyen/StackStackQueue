import axios from './customize-axios';
import { pathParams } from '../utils/Helper';

export const getAllUserStats = async (pageData) => {
  try {
    let path = pathParams(pageData);
    let res = await axios.get(`user-stat?${path}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}


export const getUserInfoForProfile = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/info`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getActivitiesOfUser = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/comments`);
    return res;
  } catch (err) {
    console.log(err);
  }
}


export const getDiscussionsOfUser = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/discussions`);
    return res;
  } catch (err) {
    console.log(err);
  }
}


export const getIntroOfUser = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/personal`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getFollowersOfUser = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/followers`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getFollowingOfUser = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/following`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const getBadgeOfUser = async (username) => {
  try {
    let res = await axios.get(`user-stat/${username}/badges`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

