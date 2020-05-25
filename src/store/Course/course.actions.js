import { toastr } from 'react-redux-toastr';
import api from '../../services/api';
import {
	FETCH_TEACHER_COURSES,
	FETCH_TEACHER_COURSES_SUCCESS,
	FETCH_TEACHER_COURSES_FAILED,
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
