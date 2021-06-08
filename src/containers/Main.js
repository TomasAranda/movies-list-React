import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Onboarding from '../components/Onboarding';
import List from './List';
import AuthPage from './AuthPage';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';

import { useSelector } from "react-redux";
import withAuth from '../hocs/withAuth';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Main() {
  const classes = useStyles();
  const isUserAuthenticated = useSelector(state => state.currentUser.isAuthenticated);
  const isLoading = useSelector(state => state.loading.loading);
  const userHasGroup = !!useSelector(state => state.currentUser.user.group);
  const WithAuthOnboarding = withAuth(Onboarding, isUserAuthenticated, userHasGroup);
  const WithAuthList = withAuth(List, isUserAuthenticated, userHasGroup);
  
  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path='/'
          component={WithAuthOnboarding}
        />
        <Route
          path='/auth'
          render={props => <AuthPage isUserAuthenticated={isUserAuthenticated} userHasGroup={userHasGroup} {...props} />}
        />
        <Route
          path='/list'
          render={props => <WithAuthList isUserAuthenticated={isUserAuthenticated} userHasGroup={userHasGroup} {...props} />}
        />
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
      <Backdrop className={classes.backdrop} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}