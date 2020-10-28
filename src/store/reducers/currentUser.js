import { SET_CURRENT_USER, SET_CURRENT_USER_GROUP } from "../actionTypes";

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {}
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user
      };
    case SET_CURRENT_USER_GROUP:
      return { ...state, user: { ...state.user, group: action.group } }
    default:
      return state;
  }
}