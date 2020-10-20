import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    height: 400,
    margin: '.7rem',
    position: 'relative',
    '&:hover img': {
      transform: 'scale(1.02)',
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
  topRightAdornement: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    zIndex: 5,
    color: theme.palette.primary.light,
  },
  deleteButton: {
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