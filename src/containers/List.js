import React, { useEffect } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Search from '../components/Search';
import MoviesLists from '../components/MovieLists';

import { useDispatch, useSelector } from 'react-redux';
import { addMovie, fetchMovies, removeMovie } from '../store/actions/movies';
// import { STARTER_DATA } from '../starterData';

export default function List() {
  // const [movies, setMovies] = useState(STARTER_DATA);
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchMovies())
      .then(() => console.log("Fetched Movies"))
      .catch(() => console.log("Error fetching movies"));
  }, [dispatch])

  const handleAddMovie = newMovie => {
    dispatch(addMovie(newMovie))
      .then(() => console.log("Movie added!"))
      .catch(() => console.log("Something went wrong"))
  }

  const handleRemoveMovie = movieId => {
    dispatch(removeMovie(movieId))
      .then(() => console.log("Movie removed!"))
      .catch(() => console.log("Something went wrong"))
  }

  return (
    <>
      <CssBaseline />
      <Search addMovie={handleAddMovie} />
      <MoviesLists movies={movies} removeMovie={handleRemoveMovie} />
    </>
  )
}