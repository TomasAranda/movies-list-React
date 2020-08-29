import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Avatar } from '@material-ui/core';

const API_KEY = '6abbe3eb';

const useStyles = makeStyles((theme) => ({
  search: {
    margin: '1rem',

  },
  avatar: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function Search() {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = useState(false);
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
  }, [value, inputValue, fetch]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      className={classes.search}
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
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search a Movie"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}