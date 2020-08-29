import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    maxWidth: 345,
    height: 400,
    margin: '.7rem',
  },
  content: {
    maxWidth: 300,
    maxHeight: 120,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,.9)',
    position: 'relative',
    // width: 300,
    top: -120,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Movies({ movies, removeMovie }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} >
        <Grid container justify="center">
          {movies.map((movie) => (
            <Grid key={movie.imdbID} item xs={12} sm={5} md={4} lg={3} container justify="center">
              <Card className={classes.card} raised>
                <CardMedia
                  component="img"
                  alt={movie.Title}
                  height="400"
                  image={movie.Poster}
                  title={movie.Title}
                />
                <CardContent className={classes.content}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {movie.Title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {movie.Plot}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
