import {
  call, cancel, fork, put, take,
} from 'redux-saga/effects';
import actionTypes from '../actions/action-types';
import actions from '../actions/actions';
import chatService from '../../services/chat-service';

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

export {
  signUpUser,
  loginFlow,
};
