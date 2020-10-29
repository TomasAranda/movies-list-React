import React, { useState, useCallback } from 'react';

import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';

import { useStyles } from '../styles/NavbarStyles';
import UsersDialog from './UsersDialog';
import StyledMenu from './StyledMenu';

export default function NavUserMenu({ user, group, handleLogout }) {
  const classes = useStyles();
  const [isDialogOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null)
  const anchorElRef = useCallback(node => { if (node === null) setAnchorEl(null) }, []);

  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback((event) => setAnchorEl(null), []);
  
  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        title='Account info'
        aria-haspopup="true"
        ref={anchorElRef}
        onClick={handleClick}
      >
        <Avatar
          className={classes.icon}
          src={user.profileImageUrl}
          alt={user.username}
        />
      </IconButton>
      <StyledMenu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ListSubheader>
          Hi {user.username}!
        </ListSubheader>
        {group._id &&
          <MenuItem onClick={() => setOpen(true)}>
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={`See friends in "${group.name}"`} />
          </MenuItem>
        }
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
      {isDialogOpen && (
        <UsersDialog
          open={isDialogOpen}
          group={group}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  )
}