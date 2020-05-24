import { createReducer } from '../util/create-reducer';
import {
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	LOGIN_REQUEST,
	LOGOUT_REQUEST,
} from './auth.actions';

const initialState = {
	token: null,
	type: null,
	isAuthenticated: false,
	isAuthenticating: false,
	error: null,
};

export const auth = createReducer(initialState, {
	[LOGIN_SUCCESS]: loginSuccess,
	[LOGIN_FAILED]: loginFailed,
	[LOGIN_REQUEST]: loginRequest,
	[LOGOUT_REQUEST]: logoutRequest,
});

function loginSuccess(state, action) {
	console.log('success');
	return {
		token: action.authInfo.token,
		type: action.authInfo.type,
		isAuthenticated: true,
		isAuthenticating: false,
		error: null,
	};
}

function loginFailed(state, action) {
	console.log('error');

	return {
		...state,
		isAuthenticating: false,
		error: action.errorMessage,
	};
}

function loginRequest(state, action) {
	console.log('request');
	return {
		...state,
		isAuthenticating: true,
		error: null,
	};
}

function logoutRequest(state, action) {
	return initialState;
}
