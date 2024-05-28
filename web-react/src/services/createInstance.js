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
		console.log(`Check refresh data`, JSON.stringify(res));
		return res.data;
	} catch (err) {
		console.log(err?.message);
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
				console.log(`Check new data accessToken`, result?.data);
				const refreshUser = {
					...user,
					accessToken: result.data,
				};
				console.log(`Check refreshUser:`, refreshUser);
				dispatch(stateSuccess(refreshUser));
				config.headers["Authorization"] = "Bearer " + result.data;
			}
			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);
	return newInstance;
};
