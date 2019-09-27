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
};
