import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 160,
    width: '100%',
    color: 'grey',
    '&:hover': {
      color: '#fff'
    }
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  // const handleChange = (event) => {
  //   setSpacing(Number(event.target.value));
  // };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((value) => (
            <Grid key={value} item xs={6} container justify="center">
              <Paper className={classes.paper}>
                <Typography variant='h5'>
                  Hola
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
