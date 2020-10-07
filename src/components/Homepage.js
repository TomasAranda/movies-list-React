import React from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Footer from './Footer';

import { useStyles } from '../styles/PageStyles'

export default function Page({ children }) {
  const isUserAuthenticated = useSelector(state => state.currentUser.isAuthenticated);
  const classes = useStyles();
  return (
    <>
      {isUserAuthenticated && (
        <Redirect to='/list' />
      )}
      <section className={classes.background}>
        <Grid className={classes.root} container justify='center' alignItems='center'>
          <Paper className={classes.paper}>
            {children}
          </Paper>
        </Grid>
        <Footer />
      </section>
    </>
  )
}