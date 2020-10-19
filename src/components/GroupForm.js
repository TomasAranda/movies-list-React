import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createGroup, editGroup } from '../store/actions/group';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useStyles } from '../styles/GroupFormStyles';

export default function GroupForm({ history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const error = useSelector(state => state.errors);
  const [existentGroup, setExistentGroup] = useState('');
  const [newGroup, setNewGroup] = useState('');

  const handleCreateGroup = async (event) => {
    event.preventDefault();
    dispatch(createGroup(newGroup))
      .then(() => history.push('/list'))
      .catch(err => console.log(err.message));
  };

  const handleJoinGroup = async (event) => {
    event.preventDefault();
    dispatch(editGroup(existentGroup))
      .then(() => history.push('/list'))
      .catch(err => console.log(err.message));
  };

  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Typography className={classes.title} variant='h2' color='textPrimary'>Create a Group</Typography>
      <form className={classes.form} onSubmit={handleCreateGroup}>
        <TextField
          id='create-group-name'
          className={classes.textField}
          label='Group Name'
          error={error['createGroup'] ? true : false}
          helperText={error['createGroup'] ? error['createGroup'].message : 'Your friends will find the group searching this name'}
          variant='filled'
          type='text'
          required
          autoComplete='off'
          value={newGroup}
          onChange={evt => setNewGroup(evt.target.value)}
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          component='button'
          type='submit'
        >
          Create
        </Button>
      </form>
      <Typography className={classes.joinText} variant='body1' align='center'>
        Or join an existent group
      </Typography>
      <Typography className={classes.title} variant='h2' color='textPrimary'>Join Group</Typography>
      <form className={classes.form} onSubmit={handleJoinGroup}>
        <TextField
          id='create-group-name'
          className={classes.textField}
          label='Group Name'
          error={error['editGroup'] ? true : false}
          helperText={error['editGroup'] ? error['editGroup'].message : "Join your friends' group"}
          variant='filled'
          type='text'
          required
          autoComplete='off'
          value={existentGroup}
          onChange={evt => setExistentGroup(evt.target.value)}
        />
        <Button
          className={classes.submitButton}
          color="primary"
          variant="contained"
          component='button'
          type='submit'
        >
          Join
        </Button>
      </form>
    </Grid>
  )
}