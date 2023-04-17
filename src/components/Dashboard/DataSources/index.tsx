import { Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import {
  getGSheetOauthURL,
  getHubSpotOauthURL,
  getMSOfficeOauthURL,
} from 'src/utils';
import { useWorkspaceStore } from '@store/workspace';
import HubSpotIcon from '@public/hubspot-icon.svg';
import MSOfficeXLIcon from '@public/ms-office-xl-icon.svg';
import GSheetIcon from '@public/gsheet-icon.svg';

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
        <Button
          variant="outlined"
          href={getGSheetOauthURL({
            jwt: authState?.token as string,
            workspaceId: selectedWorkspace?.id as string,
          })}
          target="_blank"
          startIcon={<GSheetIcon style={{ width: 24, height: 24 }} />}
          sx={{ ml: 2 }}
        >
          GSheet
        </Button>
      </Box>
    </div>
  );
};

export default DataSources;
