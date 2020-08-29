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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar color='transparent' elevation={0}>
        <Toolbar className={classes.navbar}>
          <Typography className={classes.title} color='primary' variant="h5">MOVIES LIST</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Box my={3}>
          <Search/>
          <Movies/>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;