import {
  Alert,
  AlertTitle,
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Portal,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { useWorkspaceStore } from '@store/workspace';
import { WorkspaceRole } from 'types/workspace';
import { useStyles } from './useStyles';
import { useInviteUserToWorkspaceMutation } from '@http/workspace';

const InviteMembers = () => {
  const classes = useStyles();
  const { selectedWorkspace } = useWorkspaceStore();
  const [email, setEmail] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<WorkspaceRole | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { loading, error, data, inviteUserToWorkspace } =
    useInviteUserToWorkspaceMutation();
  useEffect(() => {
    if (data && !error && !loading) {
      setShowAlert(true);
      setEmail('');
      setSelectedRole(null);
    }
  }, [data, loading, error]);

  const handleMemberInvite = () => {
    if (!selectedWorkspace || !selectedRole || !email) return;
    inviteUserToWorkspace({
      workspaceId: selectedWorkspace?.id,
      email: email,
      role: selectedRole as WorkspaceRole,
    });
  };

  return (
    <>
      <Portal>
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setShowAlert(false)} severity="success">
            <AlertTitle>
              Invited {email} as a {selectedRole} to the workspace
            </AlertTitle>
          </Alert>
        </Snackbar>
      </Portal>
      <DialogTitle>Invite members to your workspace</DialogTitle>
      <Box pl={3} pb={3}>
        <Box display="flex">
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value.trim())}
            value={email}
          />
          <FormControl className={classes.select}>
            <InputLabel id="role-select">Role</InputLabel>
            <Select
              label="Role"
              id="role-select"
              onChange={(e) => {
                setSelectedRole(e.target.value as WorkspaceRole);
              }}
            >
              <MenuItem value={WorkspaceRole.MEMBER}>Member</MenuItem>
              <MenuItem value={WorkspaceRole.ADMIN}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box mt={1}>
          <Button onClick={handleMemberInvite} variant="contained">
            {loading ? 'Loading...' : 'Invite'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default InviteMembers;
