import React, { useState, memo, useCallback } from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import LogoutIcon from '@material-ui/icons/MeetingRoom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';

import { useStyles } from '../styles/NavbarStyles';
import GroupUsers from './GroupUsers';

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

export default function NavUserMenu({ user, group, onLogout }) {
  const classes = useStyles();
  const [isDialogOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null)
  const anchorElRef = useCallback(node => {
    if (node === null) setAnchorEl(null);
  }, []);

  const handleClick = useCallback((event) => setAnchorEl(event.currentTarget), []);
  const handleClose = useCallback((event) => setAnchorEl(null), []);

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
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
          Group
        </ListSubheader>
        <MenuItem onClick={() => setOpen(true)}>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="See friends in group" />
        </MenuItem>
        <ListSubheader>
          User
        </ListSubheader>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
      {isDialogOpen && (
        <GroupUsers
          open={isDialogOpen}
          group={group}
          handleClose={() => setOpen(false)}
        />
      )}
    </>
  )
}