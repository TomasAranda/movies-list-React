import React, { useState, memo, useCallback } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStyles } from '../styles/NavbarStyles';
import { logout } from '../store/actions/auth';

const StyledMenu = memo(withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
)));

export default function Navbar(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser);
  const [anchorEl, setAnchorEl] = useState(null)
  const anchorElRef = useCallback(node => {
    if (node === null) setAnchorEl(null);
  }, []);

  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);

  const handleClose = useCallback((event) => setAnchorEl(null), []);

  const handleLogout = () => dispatch(logout());

  return (
    <>
      <AppBar color='transparent' elevation={0} position='static'>
        <Toolbar className={classes.navbar}>
          <Typography className={classes.title} color='primary' variant="h4">
            <Link to={currentUser.isAuthenticated ? "/list" : "/"}>
              MOVIES LIST
            </Link>
          </Typography>
          <div className={classes.grow} />
          {currentUser.isAuthenticated && (
            <>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                ref={anchorElRef}
                onClick={handleClick}
                className={classes.icon}
              >
                {currentUser.user['profileImageUrl'] ? (
                  <Avatar
                    src={currentUser.user.profileImageUrl}
                    alt={currentUser.user.username}
                  />
                ) : (
                    <AccountCircle />
                  )}
              </IconButton>
              <StyledMenu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <ListSubheader>
                  Group
                  </ListSubheader>
                <MenuItem>
                  <ListItemIcon>
                    <GroupIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="See friends in group" />
                </MenuItem>
                <ListSubheader>
                  User
                  </ListSubheader>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </StyledMenu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  )
}
