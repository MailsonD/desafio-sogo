import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import { auth } from './Auth/auth.reducers';
import { teacher } from './Teacher/teacher.reducers';

const rootReducer = combineReducers({
	teacher,
	auth,
	toastr,
});

export default rootReducer;
