import React from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Footer from '../components/Footer';

import { useStyles } from '../styles/PageStyles'

export default function Page({ children }) {
  const { isUserAuthenticated, user } = useSelector(state => state.currentUser);
  const classes = useStyles();
  return (
    <>
      {isUserAuthenticated && user.group && (
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