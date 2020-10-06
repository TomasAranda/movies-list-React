import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    height: 400,
    margin: '.7rem',
    position: 'relative',
    '&:hover img': {
      transform: 'scale(1.025)',
    },
    '&:hover button': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  image: {
    transition: 'transform .2s ease-in-out',
  },
  content: {
    maxWidth: 300,
    maxHeight: 150,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,.9)',
    position: 'relative',
    top: -150,
  },
  delete: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: 5,
    color: theme.palette.primary.light,
    backgroundColor: 'rgba(255,255,255,.05)',
    opacity: 0,
    transform: 'scale(.5)',
    transition: 'all .1s ease-in-out',
    '& svg': {
      textShadow: '0px 0px 4px black',
    },
  },
}));

export default function Movie({ imdbID, Title, Poster, Plot, removeMovie }) {
  const classes = useStyles();
  return (
    <Grid key={imdbID} item xs={12} sm={5} md={4} lg={3} container justify='center'>
      <Card className={classes.card} raised>
        <IconButton
          className={classes.delete}
          onClick={() => removeMovie(imdbID)}
          aria-label='Delete Movie'
          title='Delete Movie'
        >
          <Delete />
        </IconButton>
        <CardMedia
          className={classes.image}
          component="img"
          alt={Title}
          height="400"
          image={Poster}
          title={Title}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h5">
            {Title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Plot}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
