import { combineReducers } from 'redux';

import { auth } from './Auth/auth.reducers';

const rootReducer = combineReducers({ auth });

export default rootReducer;
