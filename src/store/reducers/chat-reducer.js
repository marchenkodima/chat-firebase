import actionTypes from '../actions/action-types';

const initialState = {
  currentChatId: '',
  chats: [],
  isLoaded: false,
  error: false,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHAT_DATA_REQUESTED:
      return {
        ...state,
        error: false,
      };
    case actionTypes.CHAT_DATA_SUCCEED:
      return {
        ...state,
        isLoaded: true,
        chats: [...state.chats, action.payload],
      };
    case actionTypes.CHAT_DATA_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: true,
      };
    case actionTypes.CURRENT_CHAT_CHANGED:
      return {
        ...state,
        currentChatId: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
