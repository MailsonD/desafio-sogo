import { toastr } from 'react-redux-toastr';
import api from '../../services/api';
import {
	FETCH_TEACHER_COURSES,
	FETCH_TEACHER_COURSES_SUCCESS,
	FETCH_TEACHER_COURSES_FAILED,
	NEW_COURSES_REQUEST,
	NEW_COURSES_SUCCESS,
	NEW_COURSES_FAILED,
	FETCH_ALL_COURSES,
	FETCH_ALL_COURSES_FAILED,
	FETCH_ALL_COURSES_SUCCESS,
	NEW_REGISTRATION_FAILED,
	NEW_REGISTRATION_REQUEST,
	NEW_REGISTRATION_SUCCESS,
} from './course.constants';
import { formatIntervalFromDate } from '../../util/interval-format';

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
		console.log('apa');
		const { id } = getState().auth;
		const courseData = {
			...course,
			teacher: id,
			duration: formatIntervalFromDate(
				course.realization_date,
				course.duration
			),
		};
		console.log(courseData);
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

export function fetchAllCourses() {
	const token = localStorage.getItem('token');
	return function (dispatch, getState) {
		dispatch({ type: FETCH_ALL_COURSES });
		api
			.get('minicourse', {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				dispatch({
					type: FETCH_ALL_COURSES_SUCCESS,
					courses: res.data,
				});
			})
			.catch((err) => {
				toastr.error(
					'Uma falha ocorreu :(',
					'Não foi possível buscar os minicursos'
				);
				dispatch({ type: FETCH_ALL_COURSES_FAILED });
			});
	};
}

export function requestRegistration(course) {
	const token = localStorage.getItem('token');
	return function (dispatch, getState) {
		dispatch({ type: NEW_REGISTRATION_REQUEST });
		const { id } = getState().auth;

		let updatedCourse;
		if (course.registrations) {
			updatedCourse = {
				...course,
				registrations: [...course.registrations, { id }],
			};
		} else {
			updatedCourse = {
				...course,
				registrations: [{ id }],
			};
		}

		console.log(updatedCourse);
		api
			.put(`minicourse/${course.id}`, updatedCourse, {
				headers: {
					authorization: token,
				},
			})
			.then((res) => {
				toastr.success(
					'Sucesso :)',
					'Sua inscrição foi concluída com sucesso'
				);
				dispatch({
					type: NEW_REGISTRATION_SUCCESS,
					courseId: course.id,
					userId: id,
				});
			})
			.catch((err) => {
				console.log(err);
				if (err.response && err.response.data) {
					toastr.error(
						'Uma falha ocorreu :(',
						err.response.data.message
					);
				} else {
					toastr.error(
						'Uma falha ocorreu :(',
						'Não foi possível concluir a inscrição!'
					);
				}

				dispatch({ type: NEW_REGISTRATION_FAILED });
			});
	};
}
