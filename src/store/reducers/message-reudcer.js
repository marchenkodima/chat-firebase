import actionTypes from '../actions/action-types';

const initialState = {
  message: '',
  error: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_INPUT_CHANGED:
      return {
        ...state,
        message: action.payload,
      };
    case actionTypes.MESSAGE_SEND_FAILED:
      return {
        ...state,
        message: action.error,
      };
    default:
      return state;
  }
};

export default messageReducer;
