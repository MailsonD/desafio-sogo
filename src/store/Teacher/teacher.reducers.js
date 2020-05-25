import { createReducer } from '../util/create-reducer';
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

const initialState = {
	isRequesting: false,
	success: false,
};

export const teacher = createReducer(initialState, {
	[NEW_TEACHER_REQUEST]: newRequest,
	[NEW_TEACHER_SUCCESS]: newRequestSuccess,
	[NEW_TEACHER_FAILED]: newRequestFailed,
	[RESET_TEACHER_REQUEST]: resetRequest,
	[NEW_COURSE_REQUEST]: newRequest,
	[NEW_COURSE_SUCCESS]: newRequestSuccess,
	[NEW_COURSE_FAILED]: newRequestFailed,
	[RESET_COURSE_REQUEST]: resetRequest,
});

function newRequest(state, action) {
	return {
		isRequesting: true,
		success: false,
	};
}

function newRequestSuccess(state, action) {
	return {
		isRequesting: false,
		success: true,
	};
}

function newRequestFailed(state, action) {
	return initialState;
}

function resetRequest(state, action) {
	return initialState;
}
