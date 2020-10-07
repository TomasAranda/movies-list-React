import { SET_CURRENT_GROUP } from "../actionTypes";

const DEFAULT_STATE = {
  _id: null,
  name: null,
  users: [],
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_GROUP:
      return action.group;
    default:
      return state;
  }
}