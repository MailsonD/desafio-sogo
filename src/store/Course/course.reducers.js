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
	NEW_REGISTRATION_FAILED,
	NEW_REGISTRATION_REQUEST,
	NEW_REGISTRATION_SUCCESS,
} from './course.constants';

const initialValue = {
	all: {
		lastFetch: null,
		data: [],
	},
	teacherCouses: {
		lastFetch: null,
		data: [],
	},
	registring: {
		isRegistring: false,
		course: null,
	},
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

	[NEW_REGISTRATION_REQUEST]: newRegistrationRequest,
	[NEW_REGISTRATION_SUCCESS]: newRegistrationSuccess,
	[NEW_REGISTRATION_FAILED]: newRegistrationFailed,
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
		all: {
			data: action.courses,
			lastFetch: new Date(),
		},
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
		teacherCourses: {
			data: action.courses,
			lastFetch: new Date(),
		},
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
		teacherCourses: {
			...state.teacherCourses,
			data: [...state.teacherCourses.data, action.course],
		},
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

function newRegistrationRequest(state, action) {
	return {
		...state,
		registring: {
			isRegistring: true,
			course: action.courseId,
		},
	};
}

function newRegistrationSuccess(state, action) {
	console.log('epa');
	return {
		...state,
		registring: {
			isRegistring: false,
			course: null,
		},
		all: {
			lastFetch: state.all.lastFetch,
			data: state.all.data.map((c) => {
				if (c.id === action.courseId) {
					return {
						...c,
						registrations: [
							...c.registrations,
							{ id: action.userId },
						],
					};
				}
				return c;
			}),
		},
	};
}

function newRegistrationFailed(state, action) {
	return {
		...state,
		registring: {
			isRegistring: false,
			course: null,
		},
	};
}
