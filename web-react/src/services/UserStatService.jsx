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
