import { Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import { getHubSpotOauthURL, getGAOauthURL } from 'src/utils';
import { useWorkspaceStore } from '@store/workspace';
import HubSpotIcon from '@public/hubspot-icon.svg';
import GaIcon from '@public/ga-icon.svg';

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
        <Button
          sx={{ ml: 2 }}
          variant="outlined"
          href={getGAOauthURL({
            jwt: authState?.token as string,
            workspaceId: selectedWorkspace?.id as string,
          })}
          target="_blank"
          startIcon={<GaIcon style={{ width: 24, height: 24 }} />}
        >
          Google Analytics
        </Button>
      </Box>
    </div>
  );
};

export default DataSources;
