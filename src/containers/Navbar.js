import React, { useCallback } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavUserMenu from '../components/NavUserMenu';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStyles } from '../styles/NavbarStyles';
import { logout } from '../store/actions/auth';

export default function Navbar() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser);
  const group = useSelector(state => state.group);

  const handleLogout = useCallback(
    () => dispatch(logout()),
    [dispatch]
  )

  return (
    <>
      <AppBar color='transparent' elevation={0} position='static'>
        <Toolbar className={classes.navbar}>
          <Typography className={classes.title} color='primary' variant="h4">
            <Link to={currentUser.isAuthenticated ? "/list" : "/"}>
              MOVIES LIST
            </Link>
          </Typography>
          <div className={classes.grow} />
          {currentUser.isAuthenticated && (
            <NavUserMenu user={currentUser.user} group={group} handleLogout={handleLogout} />
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
