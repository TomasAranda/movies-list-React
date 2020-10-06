import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  title: {
    color: 'white',
    marginBottom: '1rem',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    [theme.breakpoints.up('sm')]: {
      fontSize: '4rem',
    },
  },
  subTitle: {
    fontSize: '1rem',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
      fontSize: '2rem',
    },
  },
  divider: {
    margin: '1rem 0',
    [theme.breakpoints.up('sm')]: {
      margin: '1rem 0',
    },
  },
  registerButtons: {
    '& button': {
      margin: theme.spacing(2),
      padding: theme.spacing(1),
    },
    '& p': {
      lineHeight: '42px'
    },
    '& a': {
      textDecoration: 'none',
      color: 'white',
    },
  }
}));