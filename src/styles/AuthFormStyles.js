import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  form: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    width: '85%',
    fontWeight: 'bold',
    fontSize: '1.9rem',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
      maxWidth: '500px',
      marginTop: theme.spacing(2),
    },
  },
  textField: {
    width: '95%',
    maxWidth: '300px',
    backgroundColor: '#333',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '500px',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    marginTop: props => props.signUp ? theme.spacing(1) : theme.spacing(2),
    marginBottom: props => props.signUp ? theme.spacing(1) : theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    '& .MuiFormLabel-root.Mui-focused': {
      color: 'rgba(255,255,255,.7)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: '2px solid rgb(234, 58, 67)',
    },
  },
  submitButton: {
    width: '90%',
    maxWidth: '450px',
    margin: '0.5rem auto',
  },
  signupText: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'inline',
    },
  },
}));