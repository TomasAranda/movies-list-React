import { LOAD_MOVIES, REMOVE_MOVIE } from "../actionTypes";

export default (state = { userMovies: [], sharedMovies: [] }, action) => {
  switch (action.type) {
    case LOAD_MOVIES:
      return {
        userMovies: action.movies.userMovies,
        sharedMovies: action.movies.sharedMovies,
      };
    case REMOVE_MOVIE:
      return {
        userMovies: state.userMovies.filter(movie => movie._id !== action.id),
        sharedMovies: state.sharedMovies.filter(movie => movie._id !== action.id),
      }
    default:
      return state;
  }
}