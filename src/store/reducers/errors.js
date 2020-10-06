import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, [action.errorType]: { message: action.errorMessage } };
    case REMOVE_ERROR:
      return {};
    default:
      return state;
  }
}