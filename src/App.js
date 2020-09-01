import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Navbar from './Navbar';
import Search from './Search';
import MovieLists from './MovieLists';

import { STARTER_DATA } from './starterData';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e50914'
    },
    background: {
      default: '#141414',
    }
  },
});

function App(props) {
  const [movies, setMovies] = React.useState(STARTER_DATA);

  const addMovie = newMovie => {
    setMovies([newMovie, ...movies]);
  }

  const removeMovie = movieId => {
    let newMovies = movies.filter(m => m.imdbID !== movieId);
    setMovies(newMovies);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Grid container direction='column' justify='space-evenly' alignItems='center'>
        <Search addMovie={addMovie} />
        <MovieLists movies={movies} removeMovie={removeMovie} />
      </Grid>
    </ThemeProvider>
  );
}

export default App;