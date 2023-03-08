import { Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import { getHubSpotOauthURL } from 'src/utils';
import { useWorkspaceStore } from '@store/workspace';
import HubSpotIcon from '@public/hubspot-icon.svg';

const DataSources = () => {
  const classes = useStyles();
  const { authState } = useAuth();
  const { selectedWorkspace } = useWorkspaceStore();
  return (
    <div className={classes.main}>
      <Typography variant="body1">Import Data From</Typography>
      <Box marginTop={1}>
        <Button
          variant="outlined"
          href={getHubSpotOauthURL({
            jwt: authState?.token as string,
            workspaceId: selectedWorkspace?.id as string,
          })}
          target="_blank"
          startIcon={<HubSpotIcon style={{ width: 24, height: 24 }} />}
        >
          HubSpot
        </Button>
      </Box>
    </div>
  );
};

export default DataSources;
