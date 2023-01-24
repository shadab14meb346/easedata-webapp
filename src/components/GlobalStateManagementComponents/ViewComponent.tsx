import { Box } from '@mui/material';

import { useExampleStore } from '@store/example';
import { useStyles } from './useStyles';

export const ViewComponent = () => {
  const classes = useStyles();
  const exampleStore = useExampleStore();
  return <Box className={classes.main}>{exampleStore?.name}</Box>;
};
