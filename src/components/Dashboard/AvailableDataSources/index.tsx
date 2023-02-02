import { Box, CircularProgress } from '@mui/material';

import { useStyles } from './useStyles';
import ConnectionCard from './ConnectionCard';
import { useMyDataSourcesListQuery } from '@http/data-source';

const AvailableDataSources = () => {
  const { data, loading, error } = useMyDataSourcesListQuery();
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Box marginTop={1} display="flex">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {data?.map((dataSource: any) => (
              <ConnectionCard
                createdAt={dataSource.created_at}
                type={dataSource.type}
              />
            ))}
          </>
        )}
      </Box>
    </div>
  );
};

export default AvailableDataSources;
