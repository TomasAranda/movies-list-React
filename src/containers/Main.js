import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Onboarding from '../components/Onboarding';
import List from './List';
import AuthPage from './AuthPage';
import Navbar from './Navbar';

import withAuth from '../hocs/withAuth';

export default function Main() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Onboarding />
        </Route>
        <Route path='/auth'>
          <AuthPage />
        </Route>
        <Route
          path='/list'
          component={withAuth(List)}
        />
        <Route>
          <Redirect to='/' />
        </Route>
      </Switch>
    </>
  )
}