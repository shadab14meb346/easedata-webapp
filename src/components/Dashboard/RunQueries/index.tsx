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
import { useExecuteQuery } from '@http/query';
import ShowData from './ShowData';

const RunQueries = () => {
  const classes = useStyles();
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: dataSources } = useDataSourcesListQuery(
    selectedWorkspace?.id as string
  );
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<
    null | string
  >(null);
  const [selectedQuery, setSelectedQuery] = useState<null | any>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const { loading, data, executeQuery, error } = useExecuteQuery();

  const handleChange = (
    event: SelectChangeEvent<typeof selectedDataSourceId>
  ) => {
    setSelectedDataSourceId(event.target.value);
  };

  const handleRunQuery = () => {
    if (!selectedQuery) return;
    executeQuery({
      data_source_id: selectedQuery.data_source_id,
      fields: selectedFields,
      table_name: selectedQuery.table_name,
    });
  };
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
          onFieldsChange={setSelectedFields}
        />
      </div>
      <Box ml={4}>
        <Button variant="contained" onClick={handleRunQuery}>
          <Typography variant="h6">
            {loading ? 'Fetching Data...' : 'Run Query'}
          </Typography>
        </Button>
      </Box>
      <ShowData data={data} className={classes.showData} />
    </>
  );
};

export default RunQueries;
