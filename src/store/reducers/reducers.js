import { combineReducers } from 'redux';
import authorizeReducer from './authorize-reducer';

const rootReducer = combineReducers({ authorize: authorizeReducer });

export default rootReducer;
