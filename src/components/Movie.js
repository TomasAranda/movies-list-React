import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Avatar from '@material-ui/core/Avatar';

import { useStyles } from '../styles/MovieStyles';
import { useSelector } from 'react-redux';

export default function Movie({ id, users, imdbID, Title, Poster, Plot, removeMovie }) {
  const classes = useStyles();
  const groupUsers = useSelector(state => state.group.users);
  let usersOfMovie;
  if (users) usersOfMovie = groupUsers.filter(user => users.includes(user._id));

  return (
    <Grid key={imdbID} item xs={12} sm={5} md={4} lg={3} container justify='center'>
      <Card className={classes.card} raised>
        {usersOfMovie ? (
          <AvatarGroup className={classes.topRightAdornement} max={3}>
            {usersOfMovie.map(user => <Avatar key={user._id} alt={user.username} src={user.profileImageUrl} />)}
          </AvatarGroup>
        ) : (
            <IconButton
              className={classes.deleteButton}
              onClick={() => removeMovie(id)}
              aria-label='Delete Movie'
              title='Delete Movie'
            >
              <Delete />
            </IconButton>
          )}
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
