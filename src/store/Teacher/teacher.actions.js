import { toastr } from 'react-redux-toastr';
import api from '../../services/api';
import {
	NEW_COURSE_FAILED,
	NEW_COURSE_REQUEST,
	NEW_COURSE_SUCCESS,
	NEW_TEACHER_FAILED,
	NEW_TEACHER_REQUEST,
	NEW_TEACHER_SUCCESS,
	RESET_COURSE_REQUEST,
	RESET_TEACHER_REQUEST,
} from './teacher.constants';

export function newTeacher(teacher) {
	const token = localStorage.getItem('token');
	return function (dispatch) {
		dispatch({ type: NEW_TEACHER_REQUEST });
		api
			.post('/auth/register', teacher, {
				headers: {
					authorization: token,
				},
			})
			.then(() => {
				toastr.success(
					'Sucesso :)',
					'Novo professor cadastrado com sucesso!'
				);
				dispatch({ type: NEW_TEACHER_SUCCESS });
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
				dispatch({
					type: NEW_TEACHER_FAILED,
				});
			});
	};
}

export function newCourse(course) {
	const token = localStorage.getItem('token');
	return function (dispatch) {
		dispatch({ type: NEW_COURSE_REQUEST });
		api
			.post('/minicourse', course, {
				headers: {
					authorization: token,
				},
			})
			.then(() => {
				toastr.success(
					'Sucesso :)',
					'Minicurso cadastrado com sucesso!'
				);
				dispatch({ type: NEW_COURSE_SUCCESS });
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
				dispatch({
					type: NEW_COURSE_FAILED,
				});
			});
	};
}

export function resetCourseRequest() {
	return { type: RESET_COURSE_REQUEST };
}

export function resetTeacherRequest() {
	return { type: RESET_TEACHER_REQUEST };
}
