import { useDataQueriesOfAWorkspace } from '@http/workspace';
import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import { useWorkspaceStore } from '@store/workspace';
import { useState } from 'react';
import { IDataSourceType } from 'types/data-source';
import { useStyles } from './useStyles';

interface IListOfQueriesDropdownProps {
  onQuerySelect: (query: any) => void;
}
const ListOfQueriesDropdown = ({
  onQuerySelect,
}: IListOfQueriesDropdownProps) => {
  const [selectedQuery, setSelectedQuery] = useState<null | any>(null);
  const { selectedWorkspace } = useWorkspaceStore();
  const {
    loading,
    error,
    data: queries,
  } = useDataQueriesOfAWorkspace(selectedWorkspace?.id as string);
  const classes = useStyles();
  const handleChange = (event: SelectChangeEvent<typeof selectedQuery>) => {
    setSelectedQuery(event.target.value);
    onQuerySelect(event.target.value);
  };
  return (
    <div className={classes.main}>
      <InputLabel id="demo-multiple-name-label">Select Query</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        value={selectedQuery}
        onChange={handleChange}
        input={<OutlinedInput label="Name" />}
        className={classes.select}
      >
        {queries?.map((query: any) => (
          <MenuItem key={query.id} value={query}>
            {query.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default ListOfQueriesDropdown;
