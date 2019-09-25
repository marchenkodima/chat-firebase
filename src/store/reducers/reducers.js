import actionTypes from '../actions/action-types';

const initialState = {
  user: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_REQUESTED:
    case actionTypes.AUTH_USER_SUCCEED:
    case actionTypes.AUTH_USER_FAILURE:
    default: return state;
  }
};

export default rootReducer;
