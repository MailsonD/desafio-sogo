import api from '../../services/api';

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export function loginRequest() {
	return { type: LOGIN_REQUEST };
}

export function loginFailed(errorMessage) {
	localStorage.removeItem('token');
	return { type: LOGIN_FAILED, errorMessage };
}

export function loginSuccess(authInfo) {
	localStorage.setItem('token', authInfo.token);
	return { type: LOGIN_SUCCESS, authInfo };
}

export function logoutRequest() {
	localStorage.removeItem('token');
	return { type: LOGOUT_REQUEST };
}

export function loginUser(email, password) {
	return function (dispatch) {
		dispatch(loginRequest());
		return api
			.post('/auth/login', { email, password })
			.then((res) => {
				dispatch(loginSuccess(res.data));
			})
			.catch((err) => {
				dispatch(loginFailed(err.message));
			});
	};
}

export {
	LOGIN_REQUEST,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
};
