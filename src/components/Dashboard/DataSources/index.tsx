import { Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import { getHubSpotOauthURL, getMSOfficeOauthURL } from 'src/utils';
import { useWorkspaceStore } from '@store/workspace';
import HubSpotIcon from '@public/hubspot-icon.svg';
import MSOfficeXLIcon from '@public/ms-office-xl-icon.svg';

const DataSources = () => {
  const classes = useStyles();
  const { authState } = useAuth();
  const { selectedWorkspace } = useWorkspaceStore();
  return (
    <div className={classes.main}>
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
          variant="outlined"
          href={getMSOfficeOauthURL({
            jwt: authState?.token as string,
            workspaceId: selectedWorkspace?.id as string,
          })}
          target="_blank"
          startIcon={<MSOfficeXLIcon style={{ width: 24, height: 24 }} />}
          sx={{ ml: 2 }}
        >
          Ms Office XL
        </Button>
      </Box>
    </div>
  );
};

export default DataSources;
