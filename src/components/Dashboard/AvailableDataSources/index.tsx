import { Box, CircularProgress, Container } from '@mui/material';

import { useStyles } from './useStyles';
import ConnectionCard from './ConnectionCard';
import { useMyDataSourcesListQuery } from '@http/data-source';

const AvailableDataSources = () => {
  const { data, loading, error } = useMyDataSourcesListQuery();
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Container className={classes.container}>
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
      </Container>
    </div>
  );
};

export default AvailableDataSources;
