import { all, take, put } from 'redux-saga/effects';
import chatService from '../../services/chat-service';
import actionTypes from '../actions/action-types';
import actions from '../actions/actions';

function* createUser() {
  while (true) {
    let email;
    let password;

    yield take((action) => {
      if (action.type === actionTypes.CREATE_USER) {
        email = action.payload.email;
        password = action.payload.password;
        return true;
      }
      return false;
    });
    yield put(actions.authUserRequest());
    try {
      yield chatService.createUser(email, password);
      yield put(actions.authUserSuccess());
    } catch (e) {
      yield put(actions.authUserFail(e));
    }
  }
}

export default function* rootSaga() {
  yield all([
    createUser(),
  ]);
}
