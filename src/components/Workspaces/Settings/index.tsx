import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { useStyles } from './useStyles';
import { useCreateWorkspaceMutation } from '@http/workspace';
import { client } from '@graphql/index';
import { WorkspaceType } from 'types/workspace';
import { useWorkspaceStore } from '@store/workspace';

interface ISettingsProps {
  workspace: WorkspaceType;
}
export default function Settings() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [workspaceName, setWorkspaceName] = React.useState('');
  const { selectedWorkspace } = useWorkspaceStore();
  const {
    loading,
    error,
    data: createdWorkspace,
    createWorkspace,
  } = useCreateWorkspaceMutation();
  React.useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (createdWorkspace?.id) {
      client.resetStore();
      setOpen(false);
    }
  }, [loading, error, createdWorkspace]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateWorkspace = () => {
    if (!workspaceName) return;
    createWorkspace(workspaceName);
  };
  return (
    <>
      <Typography
        variant="overline"
        onClick={handleClickOpen}
        className={classes.title}
      >
        Workspace Settings
      </Typography>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>Manage your workspace settings</DialogContentText>
        </DialogContent>
        <DialogTitle>General</DialogTitle>
        <DialogContent>
          <DialogContentText>Workspace Name</DialogContentText>
          <Typography variant="h6">{selectedWorkspace?.name}</Typography>
        </DialogContent>

        {/* <Box display="flex" paddingLeft={3} paddingBottom={3}>
          <Button onClick={handleCreateWorkspace} variant="contained">
            {loading ? 'Loading...' : 'Create Workspace'}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box> */}
      </Dialog>
    </>
  );
}
