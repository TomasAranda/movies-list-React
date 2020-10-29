import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Onboarding from '../components/Onboarding';
import List from './List';
import AuthPage from './AuthPage';
import Navbar from './Navbar';

import { useSelector } from "react-redux";
import withAuth from '../hocs/withAuth';

export default function Main() {
  const isUserAuthenticated = useSelector(state => state.currentUser.isAuthenticated);
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
    </>
  )
}