import api from '../../services/api';
import {
	LOGIN_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
	REGISTER_PARTICIPANT_FAILED,
	REGISTER_PARTICIPANT_REQUEST,
	REGISTER_PARTICIPANT_SUCCESS,
} from './auth.constants';

/*
 * ACTIONS WITH SIDE EFFECTS
 */

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

export function logoutUser() {
	localStorage.removeItem('token');
	return { type: LOGOUT_REQUEST };
}

export function registerParticipant(participant) {
	return function (dispatch) {
		dispatch(registerParticipantRequest());

		api
			.post('/auth/register', participant)
			.then((res) => {
				dispatch(registerParticipantSuccess(res.data));
			})
			.catch((err) => {
				dispatch(registerParticipantFailed(err.message));
			});
	};
}

/*
 * ACTIONS CREATORS
 */

function loginRequest() {
	return { type: LOGIN_REQUEST };
}

function loginFailed(errorMessage) {
	localStorage.removeItem('token');
	return { type: LOGIN_FAILED, errorMessage };
}

function loginSuccess(authInfo) {
	localStorage.setItem('token', authInfo.token);
	return { type: LOGIN_SUCCESS, authInfo };
}

function registerParticipantRequest() {
	return { type: REGISTER_PARTICIPANT_REQUEST };
}

function registerParticipantSuccess() {
	return { type: REGISTER_PARTICIPANT_SUCCESS };
}

function registerParticipantFailed(errorMessage) {
	return {
		type: REGISTER_PARTICIPANT_FAILED,
		errorMessage,
	};
}
