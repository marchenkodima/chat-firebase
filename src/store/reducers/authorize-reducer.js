import actionTypes from '../actions/action-types';

const initialState = {
  loading: false,
  errorMessage: '',
  email: '',
  password: '',
  name: '',
};

const authorizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_REQUESTED:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case actionTypes.AUTH_USER_SUCCEED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.AUTH_USER_FAILURE:
      return {
        ...state,
        errorMessage: true,
      };
    case actionTypes.AUTH_INPUT_CHANGED:
      // eslint-disable-next-line no-case-declarations
      const { inputName } = action.payload;
      return {
        ...state,
        [inputName]: action.payload[inputName],
      };
    default:
      return state;
  }
};

export default authorizeReducer;
