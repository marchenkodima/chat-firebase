import actionTypes from '../actions/action-types';

const initialState = {
  currentChatId: '',
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
        currentChatId: action.payload.id,
        chats: {
          ...state.chats,
          [action.payload.id]: action.payload,
        },
      };
    case actionTypes.CHAT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.MESSAGES_UPDATED:
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.payload.id]: {
            ...state.chats[action.payload.id],
            messages: [
              ...state.chats[action.payload.id].messages,
              ...action.payload.messages,
            ],
          },
        },
      };
    default:
      return state;
  }
};

export default chatReducer;
