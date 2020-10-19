import React, { useState, useEffect, useRef, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

import axios from 'axios';

const API_KEY = '6abbe3eb';

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

export default function Search({ addMovie }) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const CancelToken = axios.CancelToken;
  let source = useRef(CancelToken.source());

  const fetch = useCallback(async (query) => {
    try {
      setLoading(true);
      const searchUrl = `http://www.omdbapi.com/?apikey=${API_KEY}&s='${query}'`;
      if (source.current) {
        // Cancel the previous request before making a new request
        source.current.cancel('Cancelled unnesessary request');
      }
      // Create a new CancelToken
      source.current = CancelToken.source();

      let { data } = await axios.get(searchUrl,
        { cancelToken: source.current.token }
      );
      if (data.Response === "False") {
        data = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&t='${query}'`,
          { cancelToken: source.current.token }
        );
      }
      if (data.Response === "False") return;
      setLoading(false);
      return data.data ? data.data : data;
    } catch (error) {
      if (axios.isCancel(error) || error) {
        // Handle if request was cancelled
        console.warn('Request canceled', error.message);
      } else {
        // Handle usual errors
        console.error('Something went wrong: ', error.message)
      }
    }
  }, [CancelToken])

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
          if (results.Response !== "False" && !results.Search) {
            newOptions = [...newOptions, results];
          }
          if (results.Search) {
            newOptions = [...newOptions, ...results.Search];
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
    try {
      if (value) {
        const movieUrl = `http://omdbapi.com/?apikey=6abbe3eb&i=${value.imdbID}`
        const { data } = await axios.get(movieUrl);
        addMovie(data);
        setValue(null);
      } else setError('Select a movie first');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Grid className={classes.root} container justify='center' alignItems='center'>
        <Autocomplete
          id="asynchronous-demo"
          className={classes.search}
          clearOnBlur={false}
          open={open}
          onOpen={() => {
            if (inputValue.length > 1) {
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
            setOptions(options);
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
          noOptionsText={inputValue.length < 1 ? "Start typing to search" : "No movie found"}
          loading={inputValue.length < 1 ? false : loading}
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
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <IconButton className={classes.addButton} aria-label='Add Movie' title='Add Movie' onClick={handleClick}>
          <AddIcon />
        </IconButton>
      </Grid>
    </>
  );
}