const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_FAILED = 'LOGIN_FAILED';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';

export function loginRequest(email, password) {
	const user = { email, password };
	return { type: LOGIN_REQUEST, user };
}

export function loginFailed(message) {
	return { type: LOGIN_FAILED, message };
}

export function loginSuccess(authInfo) {
	return { type: LOGIN_SUCCESS, authInfo };
}

export function logoutRequest() {
	return { type: LOGOUT_REQUEST };
}

export {
	LOGIN_REQUEST,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
};
