import actionTypes from '../actions/action-types';

const initialState = {
  chatsList: null,
  loading: false,
  error: false,
};

const chatsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_CHATS_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case actionTypes.USER_CHATS_SUCCEED:
      return {
        ...state,
        loading: false,
        chatsList: action.payload,
      };
    case actionTypes.USER_CHATS_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case actionTypes.CHATS_LIST_UPDATED:
      return {
        ...state,
        chatsList: state.chatsList.map((chat) => {
          if (chat.id === action.payload.id) {
            return {
              ...chat,
              latestMessage: action.payload.latestMessage,
            };
          }
          return chat;
        }),
      };
    default:
      return state;
  }
};

export default chatsListReducer;
