import { combineReducers } from 'redux';

import * as auth from './Auth/auth.reducer';

const rootReducer = combineReducers(auth);

export default rootReducer;
