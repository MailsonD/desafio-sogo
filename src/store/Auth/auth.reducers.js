import * as createReducer from '../util/create-reducer';
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

createReducer(initialState, {
	[LOGIN_SUCCESS]: loginSuccess,
	[LOGIN_FAILED]: loginFailed,
	[LOGIN_REQUEST]: loginRequest,
	[LOGOUT_REQUEST]: logoutRequest,
});

function loginSuccess(state, action) {
	return {
		token: action.auth.token,
		type: action.auth.type,
		isAuthenticated: true,
		isAuthenticating: false,
		error: null,
	};
}

function loginFailed(state, action) {
	return {
		...state,
		isAuthenticating: false,
		error: action.auth.error,
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
