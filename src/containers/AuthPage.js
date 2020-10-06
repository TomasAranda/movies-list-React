import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Page from '../components/Homepage';
import GroupForm from '../components/GroupForm';
import AuthForm from '../components/AuthForm';

export default function AuthPage() {
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
          render={props => <GroupForm {...props} />}
        />
      </Switch>
    </Page>
  )
}
