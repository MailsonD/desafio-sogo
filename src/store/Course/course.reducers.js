import { createReducer } from '../util/create-reducer';
import {
	FETCH_ALL_COURSES,
	FETCH_ALL_COURSES_SUCCESS,
	FETCH_TEACHER_COURSES,
	FETCH_TEACHER_COURSES_SUCCESS,
	NEW_COURSES_REQUEST,
	NEW_COURSES_SUCCESS,
	FETCH_ALL_COURSES_FAILED,
	FETCH_TEACHER_COURSES_FAILED,
	NEW_COURSES_FAILED,
} from './course.constants';

const initialValue = {
	all: [],
	teacherCouses: [],
	isFetching: false,
	newCourse: {
		isRequesting: false,
		success: false,
	},
};

export const courses = createReducer(initialValue, {
	[FETCH_ALL_COURSES]: fetchAllCourses,
	[FETCH_ALL_COURSES_SUCCESS]: fetchAllCoursesSuccess,
	[FETCH_ALL_COURSES_FAILED]: fetchAllCoursesFailed,

	[FETCH_TEACHER_COURSES]: fetchTeacherCourses,
	[FETCH_TEACHER_COURSES_SUCCESS]: fetchTeacherCoursesSuccess,
	[FETCH_TEACHER_COURSES_FAILED]: fetchTeacherCoursesFailed,

	[NEW_COURSES_REQUEST]: newCourseRequest,
	[NEW_COURSES_SUCCESS]: newCourseSuccess,
	[NEW_COURSES_FAILED]: newCourseFailed,
});

function fetchAllCourses(state, action) {
	return {
		...state,
		isFetching: true,
	};
}

function fetchAllCoursesSuccess(state, action) {
	return {
		...state,
		isFetching: false,
		all: action.courses,
	};
}

function fetchAllCoursesFailed(state, action) {
	return {
		...state,
		isFetching: false,
	};
}

function fetchTeacherCourses(state, action) {
	return {
		...state,
		isFetching: true,
	};
}

function fetchTeacherCoursesSuccess(state, action) {
	return {
		...state,
		isFetching: true,
		teacherCourses: action.courses,
	};
}

function fetchTeacherCoursesFailed(state, action) {
	return {
		...state,
		isFetching: false,
	};
}

function newCourseRequest(state, action) {
	return {
		...state,
		newCouse: {
			isRequesting: true,
			success: false,
		},
	};
}

function newCourseSuccess(state, action) {
	return {
		...state,
		newCourse: {
			isRequesting: false,
			success: true,
		},
	};
}

function newCourseFailed(state, action) {
	return {
		...state,
		newCourse: {
			isRequesting: false,
			succes: false,
		},
	};
}
