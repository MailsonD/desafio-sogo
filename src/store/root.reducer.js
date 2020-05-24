import { combineReducers } from 'redux';

import { auth } from './Auth/auth.reducers';
import { teste } from './teste.reducer';

const rootReducer = combineReducers({ auth, teste });

export default rootReducer;
