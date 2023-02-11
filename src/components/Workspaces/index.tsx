import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Popover,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import {
  UserBoxLabel,
  UserBoxText,
} from 'src/layouts/SidebarLayout/Header/Userbox';
import { useMyWorkspacesListQuery } from '@http/workspace';
import { updateWorkspaceStore, useWorkspaceStore } from '@store/workspace';
import { WorkspaceRole, WorkspaceType } from 'types/workspace';
import CreateWorkspace from './CreateWorkspace';

const Workspaces = () => {
  const classes = useStyles();
  const { authState } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<any>(null);
  const { loading, data: workspaces, error } = useMyWorkspacesListQuery();
  const { selectedWorkspace } = useWorkspaceStore();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleWorkspaceChange = (workspace: WorkspaceType) => {
    updateWorkspaceStore({
      selectedWorkspace: workspace,
    });
    handleClose();
  };
  return (
    <>
      <Button
        color="primary"
        ref={ref}
        onClick={handleOpen}
        className={classes.button}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box display="flex" alignItems="center" style={{ width: '100%' }}>
            <Avatar
              variant="square"
              alt={selectedWorkspace?.name}
              src={selectedWorkspace?.name}
              style={{ background: 'grey' }}
              sx={{ width: 30, height: 30 }}
            />
            <Box marginLeft={1}>
              <Typography variant="h6" color="white">
                {selectedWorkspace?.name}
              </Typography>
            </Box>
          </Box>
        )}
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
          {workspaces.map((workspace: WorkspaceType) => (
            <Box
              className={classes.item}
              key={workspace?.id}
              onClick={() => handleWorkspaceChange(workspace)}
            >
              <Avatar
                variant="square"
                alt={workspace?.name}
                src={workspace?.name}
                sx={{ width: 30, height: 30 }}
              />
              <UserBoxText>
                <UserBoxLabel variant="body1">{workspace?.name}</UserBoxLabel>
              </UserBoxText>
              {selectedWorkspace?.id === workspace?.id && (
                <Box marginLeft={2}>
                  <DoneIcon />
                </Box>
              )}
            </Box>
          ))}
          <Divider />
          <Box margin={1} display="flex" flexDirection="column">
            {selectedWorkspace?.role !== WorkspaceRole.MEMBER && (
              <Typography variant="overline">Workspace Settings</Typography>
            )}
            <CreateWorkspace />
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default Workspaces;
