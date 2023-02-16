import { Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import { getHubSpotOauthURL } from 'src/utils';

const DataSources = () => {
  const classes = useStyles();
  const { authState } = useAuth();
  return (
    <div className={classes.main}>
      <Typography variant="body1">Import Data From</Typography>
      <Box marginTop={1}>
        <Button
          variant="outlined"
          href={getHubSpotOauthURL({
            jwt: authState?.token as string,
            workspaceId: '13',
          })}
          target="_blank"
        >
          HubSpot
        </Button>
      </Box>
    </div>
  );
};

export default DataSources;
