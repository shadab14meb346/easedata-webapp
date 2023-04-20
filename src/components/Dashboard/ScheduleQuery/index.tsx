import { useEffect, useState } from 'react';
import {
  SelectChangeEvent,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Portal,
  Snackbar,
  Alert,
} from '@mui/material';

import { useStyles } from './useStyles';
import { useDataSourcesListQuery } from '@http/data-source';
import { useWorkspaceStore } from '@store/workspace';
import ListOfQueriesDropdown from './ListOfQueriesDropdown';
import { useScheduleQuery } from '@http/query';
import { useSnackbar } from 'notistack';

const ScheduleQuery = () => {
  const classes = useStyles();
  const { selectedWorkspace } = useWorkspaceStore();
  const { data: dataSources } = useDataSourcesListQuery(
    selectedWorkspace?.id as string
  );
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<
    null | string
  >(null);
  const [selectedQuery, setSelectedQuery] = useState<null | any>(null);
  const [selectedInterval, setSelectedInterval] = useState<string | null>(null);
  const [gsheetURL, setGsheetURL] = useState<string | null>(null);
  const { loading, data, scheduleQuery, error } = useScheduleQuery();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (data?.id) {
      enqueueSnackbar('Query Scheduled Successfully', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
      const cleanForm = () => {
        setSelectedDataSourceId(null);
        setSelectedQuery(null);
        setSelectedInterval(null);
        setGsheetURL('');
      };
      cleanForm();
    }
    if (error) {
      enqueueSnackbar(`Couldn't delete, please try again`, {
        variant: 'error',
      });
    }
  }, [data, error]);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedDataSourceId>
  ) => {
    setSelectedDataSourceId(event.target.value);
  };

  const formValidation = () => {
    if (
      !selectedDataSourceId ||
      !selectedQuery ||
      !selectedInterval ||
      !gsheetURL
    ) {
      return false;
    }
    return true;
  };
  const handleScheduleQuery = async () => {
    if (!formValidation()) {
      return;
    }
    const input = {
      query_id: selectedQuery.id,
      interval: selectedInterval as string,
      gsheet_url: gsheetURL as string,
    };
    await scheduleQuery(input);
  };

  const INTERVAL_OPTIONS = [
    { name: 'EACH_MINUTE', label: 'Each Minute' },
    { name: 'EACH_HALF_HOUR', label: 'Each 30 Minutes' },
  ];
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
        <div>
          <InputLabel id="interval">Select Interval</InputLabel>
          <Select
            labelId="interval"
            id="interval"
            value={selectedInterval}
            onChange={(e) => setSelectedInterval(e.target.value as string)}
            className={classes.select}
          >
            {INTERVAL_OPTIONS.map((interval: any) => (
              <MenuItem key={interval.name} value={interval.name}>
                {interval.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <FormControl variant="outlined" sx={{ ml: 2, width: '30%' }}>
          <FormHelperText
            id="outlined-weight-helper-text"
            className={classes.formHelperText}
          >
            GSheet URL
          </FormHelperText>
          <TextField
            value={gsheetURL}
            placeholder="https://docs.google.com/spreadsheets/d/1tmRTdcQBo7tVSdWhK8fycbfIBkQIk61_jNThY3PAG8A/edit#gid=0"
            onChange={(e) => setGsheetURL(e.target.value.trim())}
          />
        </FormControl>
      </div>
      <Box ml={4}>
        <Button variant="contained" onClick={handleScheduleQuery}>
          <Typography variant="h6">
            {loading ? 'Loading...' : 'Schedule Query'}
          </Typography>
        </Button>
      </Box>
    </>
  );
};

export default ScheduleQuery;
