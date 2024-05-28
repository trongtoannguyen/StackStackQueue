import jwt_decode from "jwt-decode";
// import axios from "./customize-axios";
import axios from "axios";
import { API_BASE_URL } from "../constants";

const URL = "http://localhost:8080/api/";

const BASE_URL = `${API_BASE_URL}/api/` ?? URL;

axios.defaults.baseURL = BASE_URL;

const refreshToken = async () => {
	try {
		const res = await axios.post("/auth/refreshtoken", null, {
			withCredentials: true,
		});
		return res.data;
	} catch (err) {
		console.log(err.message);
		// if (err?.response?.status === 403) {
		//   localStorage.clear();
		//   return (window.location.href = "/login");
		// }
		return null;
	}
};

export const createAxios = (user, dispatch, stateSuccess) => {
	const newInstance = axios.create();
	newInstance.interceptors.request.use(
		async (config) => {
			let date = new Date();
			const decodedToken = jwt_decode(user?.accessToken);
			if (decodedToken.exp < date.getTime() / 1000) {
				const result = await refreshToken();
				if (result !== null) {
					const refreshUser = {
						...user,
						accessToken: result.data,
					};
					dispatch(stateSuccess(refreshUser));
					config.headers["Authorization"] = "Bearer " + result.data;
				}
			}
			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);
	return newInstance;
};
