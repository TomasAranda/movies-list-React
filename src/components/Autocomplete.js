import React, { memo } from 'react';

import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

export default memo(function MovieAutocomplete({ classes, value, inputValue, open, error, options, loading, handleOpen, handleClose, handleChange, handleInputChange }) {
  return (
    <Autocomplete
      id="autocomplete-search-input"
      className={classes.search}
      clearOnBlur={false}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      value={value}
      onChange={handleChange}
      onInputChange={handleInputChange}
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
          label={value ? "Press the + button to add Movie" : "Search a Movie"}
          helperText={error}
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
  )
})