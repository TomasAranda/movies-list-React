import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const API_KEY = '6abbe3eb';

const useStyles = makeStyles((theme) => ({
  search: {
    margin: '1rem .5rem',
    width: '80%',
    color: theme.palette.grey[700],
  },
  avatar: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Search({ addMovie }) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  let cancel = '';

  const fetch = React.useCallback(async (query) => {
    try {
      setLoading(true);
      const searchUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&s='${query}'`;
      if (cancel) {
        // Cancel the previous request before making a new request
        cancel.cancel();
      }
      // Create a new CancelToken
      cancel = axios.CancelToken.source();
      if (inputValue.length < 3) return;
      const { data } = await axios.get(searchUrl
        ,
        {
          cancelToken: cancel.token,
        }
      );
      setLoading(false);
      return data;
    } catch (error) {
      if (axios.isCancel(error) || error) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message)
      }
    }
  }, [inputValue])

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    (async () => {
      const results = await fetch(inputValue);
      if (!results) return;
      else {
        if (active) {
          let newOptions = [];

          if (value) {
            newOptions = [value];
          }
          if (results.Search) {
            newOptions = [...newOptions, ...results.Search.slice(0, 5)];
          }
          setOptions(newOptions);
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, open]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
      setError('')
    }
  }, [open]);

  const handleClick = async () => {
    if (value) {
      const movieUrl = `http://omdbapi.com/?apikey=6abbe3eb&i=${value.imdbID}`
      const { data } = await axios.get(movieUrl);
      addMovie(data);
      setValue(null);
    } else setError('Select a movie first');
  }

  return (
    <Grid container justify='center' alignItems='center'>
      <Autocomplete
        id="asynchronous-demo"
        className={classes.search}
        clearOnBlur={false}
        open={open}
        onOpen={() => {
          if (inputValue.length < 3) {
            setLoading(true);
          }
          setOpen(true);
        }}
        onClose={() => {
          setLoading(false);
          setOpen(false);
        }}
        value={value}
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setError('');
          setInputValue(newInputValue);
        }}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.Title}
        options={options}
        renderOption={(option) => {
          return (
            <Grid container alignItems="center">
              <Grid item>
                <Avatar className={classes.avatar} alt={option.Title} src={option.Poster} />
              </Grid>
              <Grid item xs>
                <span>{option.Title}</span>
                <Typography variant="body2" color="textSecondary">
                  {option.Year}
                </Typography>
              </Grid>
            </Grid>
          );
        }}
        popupIcon={null}
        noOptionsText={inputValue.length < 3 ? "Start typing to search" : "No movie found"}
        loading={inputValue.length < 3 ? false : loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={error ? error : "Search a Movie"}
            variant="outlined"
            error={error ? true : false}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading && inputValue.length >= 3 ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <IconButton onClick={handleClick}>
        <AddIcon />
      </IconButton>
    </Grid>
  );
}