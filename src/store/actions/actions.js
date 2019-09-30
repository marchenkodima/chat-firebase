import actionTypes from './action-types';

const authUserRequest = () => ({
  type: actionTypes.AUTH_USER_REQUESTED,
});
const authUserFail = (error) => ({
  type: actionTypes.AUTH_USER_FAILURE,
  error,
});
const authUserSuccess = (userId) => ({
  type: actionTypes.AUTH_USER_SUCCEED,
  payload: userId,
});

const authInputChange = (inputName, value) => ({
  type: actionTypes.AUTH_INPUT_CHANGED,
  payload: {
    inputName,
    [inputName]: value,
  },
});

const signUpUser = (email, password, name) => ({
  type: actionTypes.SIGN_UP_USER,
  payload: {
    email,
    password,
    name,
  },
});
const signInUser = (email, password) => ({
  type: actionTypes.SIGN_IN_USER,
  payload: {
    email,
    password,
  },
});

const userDataRequest = () => ({
  type: actionTypes.USER_DATA_REQUESTED,
});
const userDataSuccess = (data) => ({
  type: actionTypes.USER_DATA_SUCCEED,
  payload: data,
});
const userDataFailure = (error) => ({
  type: actionTypes.USER_DATA_FAILURE,
  error,
});

const chatsListRequest = () => ({
  type: actionTypes.USER_CHATS_REQUESTED,
});
const chatsListSuccess = (data) => ({
  type: actionTypes.USER_CHATS_SUCCEED,
  payload: data,
});
const chatsListFailure = (error) => ({
  type: actionTypes.USER_CHATS_FAILED,
  error,
});

const chatDataRequest = (chatId) => ({
  type: actionTypes.CHAT_DATA_REQUESTED,
  payload: chatId,
});
const chatDataSuccess = (data) => ({
  type: actionTypes.CHAT_DATA_SUCCEED,
  payload: data,
});
const chatDataFailure = (error) => ({
  type: actionTypes.CHAT_DATA_FAILURE,
  error,
});

const chatsListUpdate = (payload) => ({
  type: actionTypes.CHATS_LIST_UPDATED,
  payload,
});
const chatsListSubscribe = (chatId) => ({
  type: actionTypes.CHATS_LIST_SUBSCRIBED,
  payload: chatId,
});

export default {
  signUpUser,
  authUserRequest,
  authUserFail,
  authUserSuccess,
  authInputChange,
  signInUser,
  userDataRequest,
  userDataSuccess,
  userDataFailure,
  chatDataRequest,
  chatDataSuccess,
  chatDataFailure,
  chatsListRequest,
  chatsListSuccess,
  chatsListFailure,
  chatsListUpdate,
  chatsListSubscribe,
};
