import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.75)',
    [theme.breakpoints.up('sm')]:{
      height: '70px',
    },
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50px',
    color: '#757575',
  },
  grow: {
    flexGrow: 1,
  },
  small: {
    margin: theme.spacing(2),
    fontWeight: 100,
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography className={classes.small} variant="overline">TOMAS ARANDA</Typography>
      <div className={classes.grow}></div>
      <Typography className={classes.small} variant="overline">2020</Typography>
    </footer>
  )
}