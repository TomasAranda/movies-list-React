import { combineReducers } from 'redux';
import currentUser from './currentUser';
import group from './group';
import errors from './errors';
import movies from './movies';

const rootReducer = combineReducers({
  currentUser,
  group,
  errors,
  movies
});

export default rootReducer;