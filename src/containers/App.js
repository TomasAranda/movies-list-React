import React from 'react';

import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from "jwt-decode";

import { BrowserRouter as Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Main from './Main';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#e50914'
    },
    background: {
      default: '#141414',
    },
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <Main />
      </Router>
    </ThemeProvider>
  </Provider>
)

export default App;