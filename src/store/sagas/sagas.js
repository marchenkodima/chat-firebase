import {
  all,
  take,
  put,
  call,
  fork,
  cancel,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import chatService from '../../services/chat-service';
import actionTypes from '../actions/action-types';
import actions from '../actions/actions';

function* signUpUser() {
  while (true) {
    const {
      payload: { email, password, name },
    } = yield take(actionTypes.SIGN_UP_USER);
    yield put(actions.authUserRequest());
    try {
      const userId = yield call(chatService.signUpUser, email, password, name);
      yield put(actions.authUserSuccess(userId));
    } catch (e) {
      yield put(actions.authUserFail(e));
    }
  }
}

function* authorize(email, password) {
  yield put(actions.authUserRequest());
  try {
    const userId = yield call(chatService.signInUser, email, password);
    yield put(actions.authUserSuccess(userId));
  } catch (e) {
    yield put(actions.authUserFail(e));
  }
}

function* loginFlow() {
  while (true) {
    const {
      payload: { email, password },
    } = yield take(actionTypes.SIGN_IN_USER);
    const task = yield fork(authorize, email, password);
    const action = yield take([
      actionTypes.AUTH_USER_FAILURE,
      actionTypes.SIGN_OUT_USER,
    ]);
    if (action.type === actionTypes.SIGN_OUT_USER) {
      yield cancel(task);
    }
    yield call(chatService.signOutUser);
  }
}

function* getUserInfo() {
  while (true) {
    yield take(actionTypes.USER_DATA_REQUESTED);
    try {
      const data = yield call(chatService.getUserData);
      yield put(actions.userDataSuccess(data));
    } catch (e) {
      yield put(actions.userDataFailure(e));
    }
  }
}

function* getChatsList() {
  while (true) {
    yield take(actionTypes.USER_CHATS_REQUESTED);
    try {
      const data = yield call(chatService.getChatsList);
      yield put(actions.chatsListSuccess(data));
    } catch (e) {
      yield put(actions.chatsListFailure(e));
    }
  }
}

function createChatsListChannel(socket) {
  return eventChannel((emit) => {
    const updateHandler = (payload) => {
      emit(payload);
    };

    socket.on(updateHandler);

    return () => {};
  });
}

function* watchOnLatestMessage(chatId) {
  const socket = yield call(chatService.subscribeToLatestMessageChange, chatId);
  const socketChannel = yield call(createChatsListChannel, socket);

  while (true) {
    const payload = yield take(socketChannel);
    yield put(actions.chatsListUpdate(payload));
  }
}

function* subscribeToChatsListUpdates() {
  const { payload: chats } = yield take(actionTypes.USER_CHATS_SUCCEED);
  for (let i = 0; i < chats.length; i += 1) {
    yield call(watchOnLatestMessage, chats[i].chatId);
  }
}

function* getChatData() {
  while (true) {
    const { payload: chatId } = yield take(actionTypes.CHAT_DATA_REQUESTED);
    try {
      const data = yield call(chatService.getChatData, chatId);
      yield put(actions.chatDataSuccess(data));
    } catch (e) {
      yield put(actions.chatDataFailure(e));
    }
  }
}

export default function* rootSaga() {
  yield all([
    signUpUser(),
    loginFlow(),
    getUserInfo(),
    getChatData(),
    getChatsList(),
    subscribeToChatsListUpdates(),
  ]);
}
