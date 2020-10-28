import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../store/actions/auth';
import { setGroup } from '../store/actions/group';

import Page from './Homepage';
import GroupForm from '../components/GroupForm';
import AuthForm from '../components/AuthForm';

import withAuth from '../hocs/withAuth';

export default function AuthPage({ history }) {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.errors);

  const handleAuthUser = (event, authType, values) => {
    event.preventDefault();
    dispatch(authUser(authType, { ...values }))
      .then(user => {
        if (!user.group) history.push('/auth/signup/group');
        else history.push('/list');
      })
      .catch(err => console.log(err));
  };

  const handleSetGroup = async (event, groupName, isExistentGroup) => {
    event.preventDefault();
    dispatch(setGroup(groupName, isExistentGroup))
      .then(() => history.push('/list'))
      .catch(err => console.log(err.message));
  };

  const WithAuthGroupForm = withAuth(GroupForm);

  return (
    <Page>
      <Switch>
        <Route exact path='/auth/signin'>
          <AuthForm buttonText='Log In' handleSubmit={handleAuthUser} errors={errors} />
        </Route>
        <Route exact path='/auth/signup'>
          <AuthForm signUp buttonText='Sign Up' handleSubmit={handleAuthUser} errors={errors} />
        </Route>
        <Route exact path='/auth/signup/group'>
          <WithAuthGroupForm handleSetGroup={handleSetGroup} errors={errors} />
        </Route>
        <Route>
          <Redirect to='/auth/signin' />
        </Route>
      </Switch>
    </Page>
  )
}