import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../store/actions/auth';
import { setGroup } from '../store/actions/group';

import Page from './Homepage';
import GroupForm from '../components/GroupForm';
import AuthForm from '../components/AuthForm';

import withAuth from '../hocs/withAuth';

export default function AuthPage({ history, isUserAuthenticated, userHasGroup }) {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);

  const handleAuthUser = (event, authType, values) => {
    event.preventDefault();
    dispatch(authUser(authType, { ...values }))
      .then(user => {
        if (!user.group) history.push('/auth/signup/group');
        else history.push('/list');
      })
      .catch((err) => console.log(err));
  };

  const handleSetGroup = async (event, groupName, isExistentGroup) => {
    event.preventDefault();
    dispatch(setGroup(groupName, isExistentGroup))
      .then(() => history.push('/list'))
      .catch(err => console.log(err.message));
  };

  const WithAuthForm = withAuth(AuthForm, isUserAuthenticated, userHasGroup);
  const WithAuthGroupForm = withAuth(GroupForm, isUserAuthenticated, userHasGroup);

  return (
    <Page>
      <Switch>
        <Route
          exact
          path='/auth/signin'
          render={props => <WithAuthForm buttonText='Log In' handleSubmit={handleAuthUser} errors={errors} {...props} />}
        />
        <Route
          exact
          path='/auth/signup'
          render={props => <WithAuthForm signUp buttonText='Sign Up' handleSubmit={handleAuthUser} errors={errors} {...props} />}
        />
        <Route
          exact
          path='/auth/signup/group'
          render={props => <WithAuthGroupForm handleSetGroup={handleSetGroup} errors={errors} {...props} />}
        />
        <Route>
          <Redirect to='/auth/signin' />
        </Route>
      </Switch>
    </Page>
  )
}