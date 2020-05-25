import api from '../../services/api';
import { toastr } from 'react-redux-toastr';
import jwtDecode from 'jwt-decode';
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
				toastr.success(
					'Sucesso!',
					'login realizado com sucesso!'
				);
				const decoded = jwtDecode(res.data.token);
				dispatch(
					loginSuccess({
						token: res.data.token,
						id: decoded.id,
						role: decoded.role,
					})
				);
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					toastr.error(
						'Uma falha ocorreu :(',
						err.response.data.message
					);
				} else {
					toastr.error(
						'Uma falha ocorreu :(',
						'Tente novamente depois'
					);
				}
				dispatch(loginFailed());
			});
	};
}

export function logoutUser() {
	return function (dispatch) {
		toastr.confirm('Deseja realmente sair?', {
			onOk: () => {
				localStorage.clear();
				dispatch({ type: LOGOUT_REQUEST });
			},
		});
	};
}

export function registerParticipant(participant) {
	return function (dispatch) {
		dispatch(registerParticipantRequest());

		api
			.post('/auth/register', participant)
			.then((res) => {
				toastr.success(
					'Sucesso!',
					'Cadastro realizado com sucesso!'
				);
				const decoded = jwtDecode(res.data.token);
				dispatch(
					registerParticipantSuccess({
						token: res.data.token,
						id: decoded.id,
						role: decoded.role,
					})
				);
			})
			.catch((err) => {
				if (err.response && err.response.data) {
					toastr.error(
						'Uma falha ocorreu :(',
						err.response.data.message
					);
				} else {
					toastr.error(
						'Uma falha ocorreu :(',
						'Tente novamente depois'
					);
				}
				dispatch(registerParticipantFailed());
			});
	};
}

/*
 * ACTIONS CREATORS
 */

function loginRequest() {
	return { type: LOGIN_REQUEST };
}

function loginFailed() {
	localStorage.removeItem('token');
	return { type: LOGIN_FAILED };
}

function loginSuccess(authInfo) {
	localStorage.setItem('token', `Bearer ${authInfo.token}`);
	return { type: LOGIN_SUCCESS, authInfo };
}

function registerParticipantRequest() {
	return { type: REGISTER_PARTICIPANT_REQUEST };
}

function registerParticipantSuccess() {
	return { type: REGISTER_PARTICIPANT_SUCCESS };
}

function registerParticipantFailed() {
	return {
		type: REGISTER_PARTICIPANT_FAILED,
	};
}
