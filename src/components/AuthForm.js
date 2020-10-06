import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { authUser } from '../store/actions/auth';

import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ImageIcon from '@material-ui/icons/Image';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Link } from 'react-router-dom';

import { useStyles } from '../styles/AuthFormStyles';

export default function AuthForm({ signUp, buttonText, history }) {
  const classes = useStyles({ signUp });
  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    username: '',
    email: '',
    profileImageUrl: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authType = signUp ? 'signup' : 'signin';
    dispatch(authUser(authType, { ...values }))
      .then(() => {
        if (!currentUser.user.group) history.push('/auth/signup/group');
        else history.push('/list');
      })
  };

  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Typography className={classes.title} variant='h2' color='textPrimary'>
        {signUp ? 'Sign Up' : 'Welcome back!'}
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id='auth-username'
          className={classes.textField}
          label='Username'
          variant='filled'
          type='text'
          required
          autoComplete='off'
          value={values.username}
          onChange={handleChange('username')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        {signUp && <>
          <TextField
            id='auth-email'
            className={classes.textField}
            label='Email'
            variant='filled'
            type='email'
            required
            autoComplete='off'
            value={values.email}
            onChange={handleChange('email')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  @
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id='auth-imageUrl'
            className={classes.textField}
            label='Profile Image Url'
            variant='filled'
            type='text'
            autoComplete='off'
            value={values.profileImageUrl}
            onChange={handleChange('profileImageUrl')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ImageIcon />
                </InputAdornment>
              ),
            }}
          />
        </>
        }
        <TextField
          id='auth-password'
          className={classes.textField}
          label='Password'
          variant='filled'
          type={showPassword ? 'text' : 'password'}
          required
          autoComplete='off'
          value={values.password}
          onChange={handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  title="Toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {!signUp &&
          <Typography className={classes.signupText} variant='body1' align='center'>
            Don't have an account yet? <Link to='signup' style={{ color: 'white' }}>Sign up!</Link>
          </Typography>
        }
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          component='button'
          type='submit'
        >
          {buttonText}
        </Button>
      </form>
    </Grid>
  )
}
