import axios from "../customize-axios";

const loginApi = async (loginInfo) => {
  return await axios.post('auth/signin', loginInfo);
}

const signupApi = async (username, email, password) => {
  return await axios.post('auth/signup',
    JSON.stringify({ username, email, password }), {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });
}


export { loginApi, signupApi };