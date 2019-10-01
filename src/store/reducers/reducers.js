import { combineReducers } from 'redux';
import authorizeReducer from './authorize-reducer';
import userReducer from './user-reducer';
import chatReducer from './chat-reducer';
import chatsListReducer from './chats-list-reducer';
import messageReducer from './message-reudcer';

const rootReducer = combineReducers({
  authorize: authorizeReducer,
  user: userReducer,
  chat: chatReducer,
  chatsList: chatsListReducer,
  message: messageReducer,
});

export default rootReducer;
