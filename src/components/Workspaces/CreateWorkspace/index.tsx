import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';
import { useStyles } from './useStyles';
import { useCreateWorkspaceMutation } from '@http/workspace';
import { client } from '@graphql/index';

export default function CreateWorkspace() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [workspaceName, setWorkspaceName] = React.useState('');
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
  console.log(createdWorkspace);
  return (
    <>
      <Typography
        variant="overline"
        onClick={handleClickOpen}
        className={classes.title}
      >
        Create Workspace
      </Typography>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a new workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Workspaces are shared spaces where teams can collaborate on queries
            and control access to data.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Workspace Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </DialogContent>
        <Box display="flex" paddingLeft={3} paddingBottom={3}>
          <Button onClick={handleCreateWorkspace} variant="contained">
            {loading ? 'Loading...' : 'Create Workspace'}
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Dialog>
    </>
  );
}
