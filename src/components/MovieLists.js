import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import Movie from './Movie';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tab: {
    maxWidth: '45%',
    width: '45%',
    margin: '0 auto'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export default function MoviesLists({ movies, removeMovie }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="movies lists tabs"
        >
          <Tab
            className={classes.tab}
            label="My Movies"
            icon={<ThumbUp />}
            {...a11yProps(0)}
          />
          <Tab
            className={classes.tab}
            label="Shared Likes"
            icon={<FavoriteIcon />}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container direction='row' justify='center' >
          {movies.userMovies.map(({ _id, imdbID, Title, Poster, Plot }) => (
            <Movie
              key={imdbID}
              id={_id}
              imdbID={imdbID}
              Title={Title}
              Poster={Poster}
              Plot={Plot}
              removeMovie={removeMovie}
            />
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container direction='row' justify='center' >
          {movies.sharedMovies.map(({ imdbID, Title, Poster, Plot }) => (
            <Movie
              key={imdbID}
              imdbID={imdbID}
              Title={Title}
              Poster={Poster}
              Plot={Plot}
            />
          ))}
        </Grid>
      </TabPanel>
    </div>
  );
}

