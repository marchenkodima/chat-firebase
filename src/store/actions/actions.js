import actionTypes from './action-types';

const createUser = (email, password) => ({
  type: actionTypes.CREATE_USER,
  payload: {
    email,
    password,
  },
});

const authUserRequest = () => ({
  type: actionTypes.AUTH_USER_REQUESTED,
});

const authUserFail = (error) => ({
  type: actionTypes.AUTH_USER_FAILURE,
  error,
});

const authUserSuccess = () => ({
  type: actionTypes.AUTH_USER_SUCCEED,
});

export default {
  createUser,
  authUserRequest,
  authUserFail,
  authUserSuccess,
};
