import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Page from './Homepage';
import GroupForm from '../components/GroupForm';
import AuthForm from '../components/AuthForm';

import withAuth from '../hocs/withAuth';

export default function AuthPage() {
  const WithAuthGroupForm = withAuth(GroupForm);
  return (
    <Page>
      <Switch>
        <Route
          exact
          path='/auth/signin'
          render={props => <AuthForm buttonText='Log In' {...props} />}
        />
        <Route
          exact
          path='/auth/signup'
          render={props => <AuthForm signUp buttonText='Sign Up' {...props} />}
        />
        <Route
          exact
          path='/auth/signup/group'
          render={props => <WithAuthGroupForm {...props} />}
        />
        <Route>
          <Redirect to='/auth/signin' />
        </Route>
      </Switch>
    </Page>
  )
}