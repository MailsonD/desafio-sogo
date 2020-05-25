import { combineReducers } from 'redux';

import { auth } from './Auth/auth.reducers';
import { teacher } from './Teacher/teacher.reducers';

const rootReducer = combineReducers({ teacher, auth });

export default rootReducer;
