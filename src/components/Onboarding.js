import React from 'react';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { useStyles } from '../styles/OnboardingStyles';
import Page from './Homepage';

export default function Onboarding() {
  const classes = useStyles();

  return (
    <Page>
      <Grid item className={classes.content}>
        <Typography className={classes.title} variant='h1' align='center' color='textPrimary'>Movies/Series Shared Watchlist</Typography>
        <Typography className={classes.subTitle} variant='h5' align='center'>Share your most loved movies with friends and see your matches</Typography>
        <Divider className={classes.divider} />
        <Typography variant='body1' align='center'>Register to start</Typography>
        <Grid className={classes.registerButtons} container justify='center'>
          <Button variant="contained" size='large' component='button' color="primary">
            <Link to='/auth/signin'>
              Log In
                </Link>
          </Button>
          <p>or</p>
          <Button variant="contained" size='large' component='button' color="primary">
            <Link to='/auth/signup'>
              Sign Up
                </Link>
          </Button>
        </Grid>
      </Grid>
    </Page>
  )
}
