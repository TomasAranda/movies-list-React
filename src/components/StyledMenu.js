import React, { memo } from 'react';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';

export default
  memo(withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })(
    function StyledMenu(props) {
      return (
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
      )
    }
  ))