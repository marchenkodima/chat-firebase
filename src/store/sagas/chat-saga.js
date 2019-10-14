import {
  call, put, take, fork,
} from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import chatService from '../../services/chat-service';
import actions from '../actions/actions';
import actionTypes from '../actions/action-types';

function messagesChannel(socket) {
  return eventChannel((emit) => {
    const successHandler = (payload) => {
      emit(payload);
    };

    const errorHandler = (error) => {
      console.error(error);
    };

    socket.onChange(successHandler, errorHandler);

    return () => {};
  });
}

function* loadMoreMessages(socket, id) {
  while (true) {
    const { payload: chatId } = yield take(actionTypes.MORE_MESSAGES_REQUESTED);
    if (chatId === id) {
      try {
        const messages = yield call(socket.loadMore);
        yield put(actions.moreMessagesSuccess(messages));
      } catch (e) {
        yield put(actions.moreMessagesFailed(e));
      }
    }
  }
}

function* messagesFlow(chatId) {
  const socket = yield call(chatService.loadMessages, chatId);
  const socketChannel = yield call(messagesChannel, socket);

  yield fork(loadMoreMessages, socket, chatId);

  while (true) {
    const messages = yield take(socketChannel);
    yield put(actions.messagesUpdate(messages));
  }
}

function* getChatsData() {
  while (true) {
    yield take(actionTypes.CHAT_DATA_REQUESTED);
    try {
      const data = yield call(chatService.getChatsList);
      for (let i = 0; i < data.length; i += 1) {
        yield fork(messagesFlow, data[i].id);
        yield put(actions.chatDataSuccess(data[i]));
      }
    } catch (e) {
      yield put(actions.chatDataFailure(e));
    }
  }
}

export default getChatsData;
