import { eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import chatService from '../../services/chat-service';
import actions from '../actions/actions';
import actionTypes from '../actions/action-types';

function createUpdateChannel(socket) {
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
  const socketChannel = yield call(createUpdateChannel, socket);

  while (true) {
    const payload = yield take(socketChannel);
    yield put(actions.chatsListUpdate(payload));
  }
}

function* subscribeToChatsListUpdates() {
  const { payload: chats } = yield take(actionTypes.USER_CHATS_SUCCEED);
  for (let i = 0; i < chats.length; i += 1) {
    yield call(watchOnLatestMessage, chats[i].id);
  }
}

function* watchOnMessagesUpdates(chatId) {
  const socket = yield call(chatService.subscribeToMessagesChange, chatId);
  const socketChannel = yield call(createUpdateChannel, socket);

  while (true) {
    const payload = yield take(socketChannel);
    yield put(actions.messagesUpdate(payload));
  }
}

function* subscribeToMessagesUpdates() {
  while (true) {
    const { payload: { id } } = yield take(actionTypes.CHAT_DATA_SUCCEED);
    yield call(watchOnMessagesUpdates, id);
  }
}

export {
  subscribeToChatsListUpdates,
  subscribeToMessagesUpdates,
};
