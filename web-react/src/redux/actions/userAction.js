import { loginApi } from "../../services/userService/AuthService";
import { toast } from 'react-toastify';

export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_REFRESH = 'USER_REFRESH';


export const FETCH_USER_LOGIN = 'FETCH_USER_LOGIN';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';


export const handleLoginRedux = (loginInfo) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_USER_LOGIN });

        let res = await loginApi(loginInfo);
        if (res?.token) {
            localStorage.setItem("token", res.token)
            localStorage.setItem("username", loginInfo?.username)
            dispatch({
                type: FETCH_USER_SUCCESS,
                data: { email, token: res.token }
            });

            // navigate("/"); //redirect Home
        } else if (+res?.status === 500) {
            toast.error(res.data.error);
            console.log(`Here is the error message: ${res.data.error}`);

            dispatch({
                type: FETCH_USER_ERROR,
            });
        }
    }
}

export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_LOGOUT
        });
    }
}


export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({
            type: USER_REFRESH
        });
    }
}


// userActions.js
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(token) {
    return {
        type: SET_CURRENT_USER,
        payload: token
    };
}

