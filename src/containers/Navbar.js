import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/Inbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useStyles } from '../styles/NavbarStyles';
import { Avatar } from '@material-ui/core';

export default function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const currentUser = useSelector(state => state.currentUser);

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
                onClick={handleClick}
                className={classes.icon}
              >
                {currentUser.user['profileImageUrl'] ? (
                  <Avatar src={currentUser.user.profileImageUrl} alt={currentUser.user.username}/>
                ) : (
                    <AccountCircle />
                  )}
              </IconButton>
              <Menu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <SendIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sent mail" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <DraftsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <InboxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                </MenuItem>
              </Menu>
            </>
          )
          }
        </Toolbar>
      </AppBar>
    </>
  )
}
