import { Box, TextField } from '@mui/material';

import { useStyles } from './useStyles';
import { updateExampleStore } from '@store/example';

export const UpdateComponent = () => {
  const classes = useStyles();

  return (
    <Box className={classes.main}>
      <TextField
        onChange={(e) => {
          updateExampleStore({
            name: e.target.value,
          });
        }}
      />
    </Box>
  );
};
