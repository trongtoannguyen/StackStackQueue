import axios from "./customize-axios";

const postLoginApi = async(email,password) => {
  return await axios.post('auth/signin',{username:email, password});
}

const postSignupApi = async (username, email, password) => {
  return await axios.post('auth/signup', { username, email, password });
}



export { postLoginApi, postSignupApi };