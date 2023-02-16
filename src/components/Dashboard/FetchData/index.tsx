import { useState } from 'react';
import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
} from '@mui/material';

import { useStyles } from './useStyles';
import { useDataSourcesListQuery } from '@http/data-source';
import FetchHubSpotContacts from './FetchHubSpotContacts';
import { useWorkspaceStore } from '@store/workspace';
const FetchData = () => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: dataSources } = useDataSourcesListQuery(
    selectedWorkspace?.id as string
  );
  const classes = useStyles();
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<
    null | string
  >(null);
  const handleChange = (
    event: SelectChangeEvent<typeof selectedDataSourceId>
  ) => {
    setSelectedDataSourceId(event.target.value);
  };
  return (
    <div className={classes.main}>
      <InputLabel id="demo-multiple-name-label">Select Data Source</InputLabel>
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
            {dataSource.id} {dataSource.type}
          </MenuItem>
        ))}
      </Select>
      <FetchHubSpotContacts selectDataSource={selectedDataSourceId} />
    </div>
  );
};

export default FetchData;
