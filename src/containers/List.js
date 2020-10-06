import React, { useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import Search from '../components/Search';
import MovieLists from '../components/MovieLists';

import { STARTER_DATA } from '../starterData';

export default function List() {
  const [movies, setMovies] = useState(STARTER_DATA);

  const addMovie = newMovie => {
    setMovies([newMovie, ...movies]);
  }

  const removeMovie = movieId => {
    let newMovies = movies.filter(m => m.imdbID !== movieId);
    setMovies(newMovies);
  }
  return (
    <>
      <CssBaseline />
      <Search addMovie={addMovie} />
      <MovieLists movies={movies} removeMovie={removeMovie} />
    </>
  )
}