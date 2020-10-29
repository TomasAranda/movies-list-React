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

export const removeMovie = movie_id => {
  return async (dispatch, getState) => {
    let { currentUser } = getState();
    const group_id = currentUser.user.group;
    const user_id = currentUser.user.id;
    try {
      await apiCall("delete", `/api/group/${group_id}/user/${user_id}/movies/${movie_id}`);
      return dispatch(remove(movie_id));
    } catch (err) {
      if (err)
        addError({ errorType: 'deleteMovie', message: err.message });
    }
  };
};

export const fetchMovies = () => {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      try {
        let { currentUser } = getState();
        const group_id = currentUser.user.group;
        const user_id = currentUser.user.id;
        const res = await apiCall("GET", `/api/group/${group_id}/user/${user_id}/movies`);
        dispatch(loadMovies(res));
        resolve(res);
      } catch (err) {
        if (err) dispatch(addError({ errorType: 'fetchMovies', message: err.message }));
        reject(err);
      }
    })
  };
};

export function addMovie(movieData) {
  return (dispatch, getState) => {
    return new Promise(async (resolve, reject) => {
      let { currentUser } = getState();
      const group_id = currentUser.user.group;
      const user_id = currentUser.user.id;
      try {
        const res = await apiCall("post", `/api/group/${group_id}/user/${user_id}/movies`, { ...movieData });
        dispatch(loadMovies(res));
        resolve(res);
      } catch (err) {
        if (err) dispatch(addError({ errorType: 'addMovie', message: err.message }));
        reject(err);
      }
    })
  };
}