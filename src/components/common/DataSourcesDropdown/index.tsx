import { useEffect, useState } from 'react';
import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  BoxProps,
  Box,
} from '@mui/material';
import classNames from 'classnames';

import { useStyles } from './useStyles';
import { useDataSourcesListQuery } from '@http/data-source';
import { useWorkspaceStore } from '@store/workspace';

interface DataSourcesDropdownProps extends BoxProps {
  className?: string;
  onDataSourceSelect: (value: string) => void;
}
const DataSourcesDropdown = ({
  className = '',
  onDataSourceSelect,
  ...rest
}: DataSourcesDropdownProps) => {
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: dataSources } = useDataSourcesListQuery(
    selectedWorkspace?.id as string
  );
  const classes = useStyles();
  const [selectedDataSource, setSelectedDataSource] = useState<null | any>(
    null
  );
  useEffect(() => {
    if (selectedDataSource) {
      onDataSourceSelect(selectedDataSource);
    }
  }, [selectedDataSource]);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedDataSource>
  ) => {
    setSelectedDataSource(event.target.value);
  };
  return (
    <Box className={classNames(classes.main, className)} {...rest}>
      <InputLabel id="demo-multiple-name-label">Select Data Source</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={selectedDataSource}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        className={classes.select}
      >
        {dataSources?.map((dataSource: any) => (
          <MenuItem key={dataSource.id} value={dataSource}>
            {dataSource.type}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default DataSourcesDropdown;
