import { useState, useRef } from 'react';
import { Box, Typography, Popover, Avatar, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import {
  UserBoxLabel,
  UserBoxText,
} from 'src/layouts/SidebarLayout/Header/Userbox';

const Workspaces = () => {
  const classes = useStyles();
  const { authState } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const user = {
    name: 'Bisreseach',
    avatar: '/static/images/avatars/1.jpg',
  };
  const workspaces = [
    {
      name: 'Bisreseach',
      avatar: '/static/images/avatars/1.jpg',
      active: false,
    },
    {
      name: 'Company 1',
      avatar: '/static/images/avatars/1.jpg',
      active: false,
    },
    {
      name: 'Company 2',
      avatar: '/static/images/avatars/1.jpg',
      active: true,
    },
  ];

  return (
    <>
      <Button
        color="primary"
        ref={ref}
        onClick={handleOpen}
        className={classes.button}
      >
        <Box display="flex" alignItems="center" style={{ width: '100%' }}>
          <Avatar
            variant="square"
            alt={user.name}
            src={user.avatar}
            style={{ background: 'grey' }}
            sx={{ width: 30, height: 30 }}
          />
          <Box marginLeft={1}>
            <Typography variant="h6" color="white">
              {user.name}
            </Typography>
          </Box>
        </Box>
      </Button>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        style={{ top: '40px' }}
        PaperProps={{
          classes: {
            root: classes.paper,
          },
        }}
      >
        <Box className={classes.list}>
          <Box margin={1}>
            <Typography variant="h6" color="grey">
              {authState.user?.email}
            </Typography>
          </Box>
          {workspaces.map((workspace) => (
            <Box className={classes.item}>
              <Avatar
                variant="square"
                alt={workspace.name}
                src={workspace.avatar}
                sx={{ width: 30, height: 30 }}
              />
              <UserBoxText>
                <UserBoxLabel variant="body1">{workspace.name}</UserBoxLabel>
              </UserBoxText>
              {workspace.active && (
                <Box marginLeft={2}>
                  <DoneIcon />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      </Popover>
    </>
  );
};

export default Workspaces;
