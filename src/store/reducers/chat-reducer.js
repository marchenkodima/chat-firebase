import actionTypes from '../actions/action-types';

const initialState = {
  activeChat: null,
  chats: null,
  loading: false,
  error: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.CHAT_DATA_SUCCEED:
      return {
        ...state,
        loading: false,
        activeChat: action.payload,
      };
    case actionTypes.CHAT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default chatReducer;
