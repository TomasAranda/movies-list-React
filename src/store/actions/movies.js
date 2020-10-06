import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MOVIES, REMOVE_MOVIE } from '../actionTypes';

export const loadMovies = movies => ({
  type: LOAD_MOVIES,
  movies
});

export const remove = id => ({
  type: REMOVE_MOVIE,
  id
});

export const removeMovie = (group_id, user_id, movie_id) => {
  return dispatch => {
    return apiCall("delete", `/api/group/${group_id}/user/${user_id}/movies/${movie_id}`)
      .then(() => dispatch(remove(movie_id)))
      .catch(err => { if (err) addError({ errorType: 'deleteMovie', message: err.message }) });
  };
};

export const fetchMovies = (group_id, user_id) => {
  return dispatch => {
    return apiCall("GET", `/api/group/${group_id}/user/${user_id}/movies`)
      .then(res => {
        dispatch(loadMovies(res));
      })
      .catch(err => { if (err) dispatch(addError({ errorType: 'fetchMovies', message: err.message })) });
  };
};

export const addMovie = (movieData) => (dispatch, getState) => {
  let { currentUser } = getState();
  const group_id = currentUser.user.group;
  const user_id = currentUser.user.id;
  return apiCall("post", `/api/group/${group_id}/user/${user_id}/movies`, { ...movieData })
    .then(res => { console.log('Movie added! (FROM actions/movies.js)') })
    .catch(err => { if (err) dispatch(addError({ errorType: 'addMovie', message: err.message })) });
};