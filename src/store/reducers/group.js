import { SET_CURRENT_GROUP } from "../actionTypes";

const DEFAULT_STATE = {
  id: null,
  name: null,
  users: [],
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return {
        id: action.id,
        name: action.name,
        users: action.users,
      };
    default:
      return state;
  }
}