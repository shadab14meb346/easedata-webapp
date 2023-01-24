import { Box } from '@mui/material';
import { useContinentsQuery } from '@http/continents';

import { useStyles } from './useStyles';

interface IContinentsProps {
  load: boolean;
}

const Continents = ({ load }: IContinentsProps) => {
  const classes = useStyles();
  const { data, error, loading } = useContinentsQuery();

  return (
    <Box className={classes.main}>
      {loading ? 'Loading' : JSON.stringify(data)}
    </Box>
  );
};

export default Continents;
