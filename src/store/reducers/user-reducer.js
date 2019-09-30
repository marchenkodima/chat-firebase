import actionTypes from '../actions/action-types';

const initialState = {
  userId: '',
  avatar: '',
  online: false,
  name: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCEED:
      return {
        ...state,
        userId: action.payload,
      };
    case actionTypes.USER_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.USER_DATA_SUCCEED:
      return {
        ...state,
        loading: false,
        ...action.payload,
      };
    case actionTypes.USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
