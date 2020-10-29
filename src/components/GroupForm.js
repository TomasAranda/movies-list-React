import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { useStyles } from '../styles/GroupFormStyles';

export default function GroupForm({ handleSetGroup, errors }) {
  const classes = useStyles();
  const [existentGroup, setExistentGroup] = useState('');
  const [newGroup, setNewGroup] = useState('');

  return (
    <Grid container direction='column' alignItems='center' justify='center'>
      <Typography className={classes.title} variant='h2' color='textPrimary'>Create a Group</Typography>
      <form className={classes.form} onSubmit={(evt) => handleSetGroup(evt, newGroup, false)}>
        <TextField
          id='create-group-name'
          className={classes.textField}
          label='Group Name'
          error={Boolean(errors['createGroup'])}
          helperText={errors['createGroup'] ? errors['createGroup'].message : 'Your friends will find the group searching this name'}
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
      <form className={classes.form} onSubmit={(evt) => handleSetGroup(evt, existentGroup, true)}>
        <TextField
          id='create-group-name'
          className={classes.textField}
          label='Group Name'
          error={Boolean(errors['editGroup'])}
          helperText={errors['editGroup'] ? errors['editGroup'].message : "Join your friends' group"}
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