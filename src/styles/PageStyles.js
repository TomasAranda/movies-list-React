import { makeStyles } from '@material-ui/core';
import image from './images/Onboarding.jpg';

export const useStyles = makeStyles((theme) => ({
  background: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
    },
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    width: '100vw',
  },
  onBoardingBackground: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    height: '100vh',
    width: '100vw',
  },
  root: {
    height: 'calc(100vh - 106px)',
    padding: '5%',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 134px)',
    },
  },
  paper: {
    backgroundColor: 'rgba(0,0,0,.75)',
    color: '#757575',
    height: '70%',
    minHeight: '380px',
    width: '100%',
    padding: theme.spacing(2),
    maxWidth: '700px',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      padding: theme.spacing(4),
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '600px',
      minWidth: '800px',
      padding: theme.spacing(4),
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));