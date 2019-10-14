import actionTypes from '../actions/action-types';

const initialState = {
  messages: {},
  isLoaded: false,
  error: false,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MESSAGES_UPDATED:
      return {
        ...state,
        isLoaded: true,
        messages: {
          ...state.messages,
          [action.payload.id]: state.messages[action.payload.id]
            ? [...state.messages[action.payload.id], ...action.payload.messages]
            : action.payload.messages,
        },
      };
    case actionTypes.MORE_MESSAGES_SUCCEED:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.id]: [
            ...action.payload.messages,
            ...state.messages[action.payload.id],
          ],
        },
      };
    case actionTypes.MORE_MESSAGES_FAILED:
    default:
      return state;
  }
};

export default messagesReducer;
