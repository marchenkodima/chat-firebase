import actionTypes from './action-types';

const signUpUser = (email, password, name) => ({
  type: actionTypes.SIGN_UP_USER,
  payload: {
    email,
    password,
    name,
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

const authInputChange = (inputName, value) => ({
  type: actionTypes.AUTH_INPUT_CHANGED,
  payload: {
    inputName,
    [inputName]: value,
  },
});

const signInUser = (email, password) => ({
  type: actionTypes.SIGN_IN_USER,
  payload: {
    email,
    password,
  },
});

export default {
  signUpUser,
  authUserRequest,
  authUserFail,
  authUserSuccess,
  authInputChange,
  signInUser,
};
