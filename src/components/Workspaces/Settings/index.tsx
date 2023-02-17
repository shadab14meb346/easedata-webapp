import * as React from 'react';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import { useStyles } from './useStyles';
import { useWorkspaceStore } from '@store/workspace';
import InviteMembers from './InviteMembers';

export default function Settings() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { selectedWorkspace } = useWorkspaceStore();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
        <DialogContent>
          <DialogContentText>Workspace Name</DialogContentText>
          <Typography variant="h6">{selectedWorkspace?.name}</Typography>
        </DialogContent>
        <InviteMembers />
      </Dialog>
    </>
  );
}
