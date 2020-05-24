import { createReducer } from '../util/create-reducer';
import {
	LOGIN_FAILED,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_REQUEST,
	REGISTER_PARTICIPANT_FAILED,
	REGISTER_PARTICIPANT_REQUEST,
	REGISTER_PARTICIPANT_SUCCESS,
} from './auth.constants';

const initialState = {
	token: null,
	role: null,
	isAuthenticated: false,
	isAuthenticating: false,
	error: null,
	isRegistring: false,
};

export const auth = createReducer(initialState, {
	[LOGIN_SUCCESS]: loginSuccess,
	[LOGIN_FAILED]: loginFailed,
	[LOGIN_REQUEST]: loginRequest,
	[LOGOUT_REQUEST]: logoutRequest,
	[REGISTER_PARTICIPANT_REQUEST]: registerRequest,
	[REGISTER_PARTICIPANT_FAILED]: registerFailed,
	[REGISTER_PARTICIPANT_SUCCESS]: registerParticipantSuccess,
});

function loginSuccess(state, action) {
	return {
		token: action.authInfo.token,
		role: action.authInfo.role,
		isAuthenticated: true,
		isAuthenticating: false,
		error: null,
	};
}

function loginFailed(state, action) {
	return {
		...state,
		isAuthenticating: false,
		error: action.errorMessage,
	};
}

function loginRequest(state, action) {
	return {
		...state,
		isAuthenticating: true,
		error: null,
	};
}

function logoutRequest(state, action) {
	return initialState;
}

function registerRequest(state, action) {
	return {
		...state,
		isRegistring: true,
		error: null,
	};
}

function registerFailed(state, action) {
	return {
		...state,
		isRegistring: false,
		error: action.errorMessage,
	};
}

function registerParticipantSuccess(state, action) {
	return {
		...state,
		isRegistring: false,
		error: null,
		token: action.authInfo.token,
		role: action.authInfo.role,
	};
}
