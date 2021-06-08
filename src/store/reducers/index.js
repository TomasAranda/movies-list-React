import { combineReducers } from 'redux';
import currentUser from './currentUser';
import group from './group';
import movies from './movies';
import loading from './loading';
import errors from './errors';

const rootReducer = combineReducers({
  currentUser,
  group,
  movies,
  loading,
  errors
});

export default rootReducer;