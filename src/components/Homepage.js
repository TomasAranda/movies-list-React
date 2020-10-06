import React from 'react'
import Footer from './Footer';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { useStyles } from '../styles/PageStyles'

export default function Page({ children }) {
  const classes = useStyles();
  return (
    <section className={classes.background}>
      <Grid className={classes.root} container justify='center' alignItems='center'>
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </Grid>
      <Footer />
    </section>
  )
}
