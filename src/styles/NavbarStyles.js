import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  navbar: {
    zIndex: 1,
    overflow: 'hidden',
    height: '80px',
    background: 'linear-gradient(to bottom,black,transparent)',
  },
  title: {
    marginLeft: '1rem',
    textShadow: '0px 0px 6px rgba(229,9,20,0.7)',
    fontWeight: 700,
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto'
    },
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
    },
  },
  grow: {
    [theme.breakpoints.up('sm')]: {
      flexGrow: 1,
    },
  },
  icon: {
    color: '#fff',
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));