import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles((theme) => ({
  form: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(2),
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '95%',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up('sm')]: {
      fontSize: '3rem',
      textAlign: 'center',
      maxWidth: '500px',
      marginTop: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  textField: {
    width: '95%',
    maxWidth: '300px',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '500px',
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    '& .MuiFilledInput-root': {
      backgroundColor: '#333',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: 'rgba(255,255,255,.7)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: '2px solid rgb(234, 58, 67)',
    },
  },
  submitButton: {
    width: '15%',
    maxWidth: '450px',
    height: '50%',
    marginRight: '.5rem',
    marginBottom: '1.4rem',
  },
  joinText: {
    marginBottom: theme.spacing(1),
  }
}));