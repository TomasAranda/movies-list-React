import React from 'react';
import Search from './Search'
import Movies from './Movies'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import './App.css';
import { Grid } from '@material-ui/core';

const STARTER_DATA = [
  {
    Title: "The Godfather",
    Year: "1972",
    Rated: "R",
    Released: "24 Mar 1972",
    Runtime: "175 min",
    Genre: "Crime, Drama",
    Director: "Francis Ford Coppola",
    Writer: "Mario Puzo (screenplay by), Francis Ford Coppola (screenplay by), Mario Puzo (based on the novel by)",
    Actors: "Marlon Brando, Al Pacino, James Caan, Richard S. Castellano",
    Plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    Language: "English, Italian, Latin",
    Country: "USA",
    Awards: "Won 3 Oscars. Another 26 wins & 30 nominations.",
    Poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "9.2/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "98%"
      },
      {
        Source: "Metacritic",
        Value: "100/100"
      }
    ],
    Metascore: "100",
    imdbRating: "9.2",
    imdbVotes: "1,562,921",
    imdbID: "tt0068646",
    Type: "movie",
    DVD: "09 Oct 2001",
    BoxOffice: "N/A",
    Production: "Paramount Pictures",
    Website: "N/A",
    Response: "True"
  },
  {
    Title: "Star Wars: Episode IV - A New Hope",
    Year: "1977",
    Rated: "PG",
    Released: "25 May 1977",
    Runtime: "121 min",
    Genre: "Action, Adventure, Fantasy, Sci-Fi",
    Director: "George Lucas",
    Writer: "George Lucas",
    Actors: "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
    Plot: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    Language: "English",
    Country: "USA",
    Awards: "Won 6 Oscars. Another 52 wins & 28 nominations.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.6/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "92%"
      },
      {
        Source: "Metacritic",
        Value: "90/100"
      }
    ],
    Metascore: "90",
    imdbRating: "8.6",
    imdbVotes: "1,199,294",
    imdbID: "tt0076759",
    Type: "movie",
    DVD: "21 Sep 2004",
    BoxOffice: "N/A",
    Production: "20th Century Fox",
    Website: "N/A",
    Response: "True"
  },
  {
    Title: "The Avengers",
    Year: "2012",
    Rated: "PG-13",
    Released: "04 May 2012",
    Runtime: "143 min",
    Genre: "Action, Adventure, Sci-Fi",
    Director: "Joss Whedon",
    Writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
    Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
    Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    Language: "English, Russian, Hindi",
    Country: "USA",
    Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    Ratings: [
      {
        Source: "Internet Movie Database",
        Value: "8.0/10"
      },
      {
        Source: "Rotten Tomatoes",
        Value: "92%"
      },
      {
        Source: "Metacritic",
        Value: "69/100"
      }
    ],
    Metascore: "69",
    imdbRating: "8.0",
    imdbVotes: "1,239,566",
    imdbID: "tt0848228",
    Type: "movie",
    DVD: "25 Sep 2012",
    BoxOffice: "$623,279,547",
    Production: "Walt Disney Pictures",
    Website: "N/A",
    Response: "True"
  }
]

const useStyles = makeStyles({
  navbar: {
    height: '80px',
    background: 'linear-gradient(to bottom,black,transparent)',
  },
  title: {
    marginLeft: '1rem',
  },
})

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
  const classes = useStyles();
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
      <AppBar color='transparent' elevation={0}>
        <Toolbar className={classes.navbar}>
          <Typography className={classes.title} color='primary' variant="h5">MOVIES LIST</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Grid container direction='column' justify='space-evenly' alignItems='center'>
        <Search addMovie={addMovie} />
        <Movies movies={movies} removeMovie={removeMovie} />
      </Grid>
    </ThemeProvider>
  );
}

export default App;