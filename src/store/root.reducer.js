import { combineReducers } from 'redux';

import * as authReducers from './Auth/auth.reducer';

const rootReducer = combineReducers(authReducers);

export default rootReducer;
