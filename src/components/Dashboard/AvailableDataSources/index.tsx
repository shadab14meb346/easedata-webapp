import { Box } from '@mui/material';

import { useStyles } from './useStyles';
import ConnectionCard from './ConnectionCard';

const AvailableDataSources = () => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Box marginTop={1} display="flex">
        <ConnectionCard createdAt="12-10-22" type="Google Analytics" />
      </Box>
    </div>
  );
};

export default AvailableDataSources;
