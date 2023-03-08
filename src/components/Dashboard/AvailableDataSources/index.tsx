import { Box, CircularProgress, Container } from '@mui/material';

import { useStyles } from './useStyles';
import ConnectionCard from './ConnectionCard';
import { useDataSourcesListQuery } from '@http/data-source';
import { useWorkspaceStore } from '@store/workspace';

const AvailableDataSources = () => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { data, loading, error, refetch } = useDataSourcesListQuery(
    selectedWorkspace?.id as string
  );
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
                dataSourceId={dataSource.id}
                refetch={refetch}
              />
            ))}
          </>
        )}
      </Container>
    </div>
  );
};

export default AvailableDataSources;
