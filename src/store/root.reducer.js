import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { auth } from './Auth/auth.reducers';
import { teacher } from './Teacher/teacher.reducers';
import { courses } from './Course/course.reducers';

const rootReducer = combineReducers({
	teacher,
	auth,
	courses,
	toastr,
});

export default rootReducer;
