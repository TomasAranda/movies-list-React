import React, { useCallback, useEffect, useMemo } from 'react';

import Search from '../components/Search';
import MoviesLists from '../components/MovieLists';

import { useDispatch, useSelector } from 'react-redux';
import { addMovie, fetchMovies, removeMovie } from '../store/actions/movies';
import useAutocompleteState from '../hooks/useAutocompleteState';

import axios from 'axios';

export default function List({ isUserAuthenticated, userHasGroup }) {
  const movies = useSelector(state => state.movies);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch()

  const autocompleteState = useAutocompleteState();

  ///////////////////////////// TODO: ADD SNACKBAR MESSAGES ON MOVIE CHANGES (ADD, REMOVE, FETCH ERRORS) //////////////////////////////////

  useEffect(() => {
    if (isUserAuthenticated && userHasGroup) {
      dispatch(fetchMovies())
        .then(() => console.log('Fetched Movies'))
        .catch((err) => console.log("Error fetching movies: ", err));
    }
  }, [dispatch, isUserAuthenticated, userHasGroup])

  const handleAddMovie = useCallback(newMovie => {
    dispatch(addMovie(newMovie))
      .then((res) => console.log("Movie added!: ", res))
      .catch((err) => console.log("Something went wrong: ", err))
  }, [dispatch]);

  const handleRemoveMovie = movieId => {
    dispatch(removeMovie(movieId))
      .then(() => console.log("Movie removed!"))
      .catch(() => console.log("Something went wrong"))
  }

  const handleSearch = useCallback(async () => {
    try {
      if (autocompleteState.value) {
        const movieUrl = `https://omdbapi.com/?apikey=6abbe3eb&i=${autocompleteState.value.imdbID}`
        const { data } = await axios.get(movieUrl);
        handleAddMovie(data);
        autocompleteState.setValue(null);
      } else {
        autocompleteState.setError('Select a movie first');
      }
    } catch (error) {
      console.log(error);
    }
  }, [autocompleteState, handleAddMovie]);

  const memoizedSearchBar = useMemo(() => <Search handleSearch={handleSearch} autocompleteState={autocompleteState} />, [handleSearch, autocompleteState]);

  return (
    <>
      {memoizedSearchBar}
      <MoviesLists movies={movies} error={errors['fetchMovies'] || { message: null }} removeMovie={handleRemoveMovie} />
    </>
  )
}