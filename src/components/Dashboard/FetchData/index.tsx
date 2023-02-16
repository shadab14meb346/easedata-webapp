import { useState } from 'react';
import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Typography,
} from '@mui/material';

import { useStyles } from './useStyles';
import { useDataSourcesListQuery } from '@http/data-source';
import { useWorkspaceStore } from '@store/workspace';
import ListOfQueriesDropdown from './ListOfQueriesDropdown';
import FieldsDropdown from '@components/common/FieldsDropdown';

const FetchData = () => {
  const classes = useStyles();
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: dataSources } = useDataSourcesListQuery(
    selectedWorkspace?.id as string
  );
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<
    null | string
  >(null);
  const [selectedQuery, setSelectedQuery] = useState<null | any>(null);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedDataSourceId>
  ) => {
    setSelectedDataSourceId(event.target.value);
  };

  const handleRunQuery = () => {};
  const loading = false;
  return (
    <>
      <div className={classes.main}>
        <Box className={classes.item}>
          <InputLabel id="demo-multiple-name-label">
            Select Data Source
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={selectedDataSourceId}
            onChange={handleChange}
            input={<OutlinedInput label="Name" />}
            className={classes.select}
          >
            {dataSources?.map((dataSource: any) => (
              <MenuItem key={dataSource.id} value={dataSource.id}>
                {dataSource.type}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <ListOfQueriesDropdown
          onQuerySelect={(query) => {
            setSelectedQuery(query);
          }}
        />
        <FieldsDropdown
          fields={selectedQuery?.fields.map((field: string) => {
            return {
              name: field,
              value: field,
            };
          })}
        />
      </div>
      <Box ml={4}>
        <Button variant="contained">
          <Typography variant="h6" onClick={handleRunQuery}>
            {loading ? 'Fetching Data...' : 'Run Query'}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default FetchData;
