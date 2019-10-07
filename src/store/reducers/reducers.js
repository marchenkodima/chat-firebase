import { combineReducers } from 'redux';
import authorizeReducer from './authorize-reducer';
import userReducer from './user-reducer';
import chatReducer from './chat-reducer';
import messagesReducer from './messages-reducer';
import messageInputReducer from './message-input-reducer';

const rootReducer = combineReducers({
  authorize: authorizeReducer,
  user: userReducer,
  chat: chatReducer,
  messageInput: messageInputReducer,
  messages: messagesReducer,
});

export default rootReducer;
