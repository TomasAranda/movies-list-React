import { SET_LOADING } from "../actionTypes";

const DEFAULT_STATE = {
  loading: false,
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.newValue
      };
    default:
      return state;
  }
}