import { toastr } from 'react-redux-toastr';
import api from '../../services/api';
import {
	FETCH_TEACHER_COURSES,
	FETCH_TEACHER_COURSES_SUCCESS,
	FETCH_TEACHER_COURSES_FAILED,
	NEW_COURSES_REQUEST,
	NEW_COURSES_SUCCESS,
	NEW_COURSES_FAILED,
} from './course.constants';

export function fetchTeacherCourses() {
	const token = localStorage.getItem('token');
	return function (dispatch, getState) {
		dispatch({ type: FETCH_TEACHER_COURSES });
		const { id } = getState().auth;
		console.log(id);
		api
			.get(`minicourse?teacher=${id}`, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				dispatch({
					type: FETCH_TEACHER_COURSES_SUCCESS,
					courses: res.data,
				});
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

				dispatch({ type: FETCH_TEACHER_COURSES_FAILED });
			});
	};
}

export function newCourse(course) {
	const token = localStorage.getItem('token');
	return function (dispatch, getState) {
		dispatch({ type: NEW_COURSES_REQUEST });
		const { id } = getState().auth;
		const courseData = { ...course, teacher: id };
		api
			.post('minicourse', courseData, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				toastr.success(
					'Sucesso :)',
					'O minicurso foi cadastrado com sucesso'
				);
				dispatch({
					type: NEW_COURSES_SUCCESS,
					course: courseData,
				});
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
						'Não foi possível criar o novo minicurso'
					);
				}
				dispatch({ type: NEW_COURSES_FAILED });
			});
	};
}
