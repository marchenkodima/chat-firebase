import { combineReducers } from 'redux';
import authorizeReducer from './authorize-reducer';
import userReducer from './user-reducer';

const rootReducer = combineReducers({ authorize: authorizeReducer, user: userReducer });

export default rootReducer;
