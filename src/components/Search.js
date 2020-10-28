import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import MovieAutocomplete from './Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 .5rem',
    marginBottom: '1rem',
  },
  search: {
    width: '80%',
    color: theme.palette.grey[700],
  },
  avatar: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Search({ autocompleteState, handleSearch }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container justify='center' alignItems='center'>
      <MovieAutocomplete classes={classes} {...autocompleteState} />
      <IconButton className={classes.addButton} aria-label='Add Movie' title='Add Movie' onClick={handleSearch}>
        <AddIcon />
      </IconButton>
    </Grid>
  );
}