import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles(theme => ({
  navbar: {
    height: '80px',
    background: 'linear-gradient(to bottom,black,transparent)',
  },
  title: {
    marginLeft: '1rem',
    textShadow: '0px 0px 6px rgba(229,9,20,0.7)',
    fontWeight: 700,
  },
  grow: {
    flexGrow: 1,
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const classes = useStyles();

  return (
    <>
      <HideOnScroll>
        <AppBar color='transparent' elevation={0}>
          <Toolbar className={classes.navbar}>
            <Typography className={classes.title} color='primary' variant="h5">MOVIES LIST</Typography>
            <div className={classes.grow} />
            <div>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  )
}
