import {
  all,
  take,
  put,
  call,
} from 'redux-saga/effects';
import chatService from '../../services/chat-service';
import actionTypes from '../actions/action-types';
import actions from '../actions/actions';

import { signUpUser, loginFlow } from './login-saga';
import { subscribeToMessagesUpdates, subscribeToChatsListUpdates } from './subscribe-saga';

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

function* postMessage() {
  while (true) {
    const { payload: { message, chatId } } = yield take(actionTypes.MESSAGE_SEND_REQUESTED);
    try {
      yield call(chatService.postMessage, message, chatId);
      yield put(actions.messageSendSuccess());
    } catch (e) {
      yield put(actions.messageSendFailure(e));
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
    postMessage(),
    subscribeToMessagesUpdates(),
  ]);
}
