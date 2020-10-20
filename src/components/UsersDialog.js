import React from 'react'

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

export default function UsersDialog({ group, open, handleClose, movieTitle }) {
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">
        {group.name ? `Users in "${group.name}"` : `Friends who added "${movieTitle}"`}
      </DialogTitle>
      <List>
        {group.users.map(({ _id, username, profileImageUrl }) => (
          <ListItem key={_id}>
            <ListItemAvatar>
              <Avatar
                src={profileImageUrl}
                alt={username}
              />
            </ListItemAvatar>
            <ListItemText primary={username} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}
