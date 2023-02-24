import { forwardRef, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
  Button,
  Snackbar,
  AlertTitle,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Portal from '@mui/base/Portal';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import classNames from 'classnames';
import SlideshowIcon from '@mui/icons-material/Slideshow';

import { useStyles } from './useStyles';
import DataSourcesDropdown from '@components/common/DataSourcesDropdown';
import { useCreateQueryMutation, useExecuteQuery } from '@http/query';
import { useWorkspaceStore } from '@store/workspace';
import { useDataSourceTableFieldsQuery } from '@http/data-source';
import ShowData from '../RunQueries/ShowData';
import Filters from './Filters';
import { FilterType } from 'types/filter';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: '500px',
      maxWidth: '250px',
    },
  },
};
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddQuery = () => {
  const classes = useStyles();
  const { selectedWorkspace } = useWorkspaceStore();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [queryName, setQueryName] = useState<string>('');
  const [selectedDataSource, setSelectedDataSource] = useState<null | any>(
    null
  );
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<string | null>('');
  const { loading, error, data, createQuery } = useCreateQueryMutation();
  const [filters, setFilters] = useState<FilterType[]>([]);

  const {
    loading: queryExecuting,
    data: queryData,
    executeQuery,
    error: executeQueryError,
  } = useExecuteQuery();
  const {
    loading: fieldsLoading,
    error: errorInFieldsLoading,
    data: fields,
    fetchDataSourceTableFields,
  } = useDataSourceTableFieldsQuery();

  useEffect(() => {
    if (data?.id && !error) {
      setShowAlert(true);
    }
  }, [loading, data, error]);

  useEffect(() => {
    setSelectedFields([]);
    if (selectedDataSource && selectedTable) {
      fetchDataSourceTableFields({
        data_source_id: selectedDataSource?.id,
        table_name: selectedTable,
      });
    }
  }, [selectedDataSource, selectedTable]);

  const handleExecuteQuery = () => {
    if (!selectedDataSource || !selectedTable) return;
    executeQuery({
      data_source_id: Number(selectedDataSource?.id),
      fields: selectedFields,
      table_name: selectedTable,
      filters: filters.map((filter) => {
        const { field, operator, value } = filter;
        return {
          field: field.name,
          // @ts-ignore
          operator: operator.type,
          value,
        };
      }),
    });
  };

  const handleDataSourceSelect = (selectedDataSource: any) => {
    setSelectedDataSource(selectedDataSource);
  };
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selectedFiendsName = value.map((value: any) => value?.name ?? value);
    setSelectedFields(selectedFiendsName);
  };
  const handleCreateQuery = () => {
    createQuery({
      name: queryName,
      fields: selectedFields,
      data_source_id: Number(selectedDataSource?.id),
      table_name: selectedTable as string,
      workspace_id: Number(selectedWorkspace?.id),
      description: '',
    });
  };
  return (
    <>
      {/* //TODO: Move the snackbar to a global component */}
      <Portal>
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => setShowAlert(false)} severity="success">
            <AlertTitle>Query Created Successfully</AlertTitle>
          </Alert>
        </Snackbar>
      </Portal>
      <div className={classes.main}>
        <Typography variant="h6">Create New Query</Typography>
        <Box marginTop={4} display="flex" alignItems="flex-end">
          <FormControl variant="outlined" className={classes.item}>
            <FormHelperText
              id="outlined-weight-helper-text"
              className={classes.formHelperText}
            >
              Query Name
            </FormHelperText>
            <TextField
              id="outlined-adornment-weight"
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
              placeholder="Get User"
              onChange={(e) => setQueryName(e.target.value.trim())}
            />
          </FormControl>
          <DataSourcesDropdown
            onDataSourceSelect={handleDataSourceSelect}
            className={classes.item}
          />
          <Box mr={2} className={classes.item}>
            <InputLabel id="table-options">Select Table</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="table-options"
              input={<OutlinedInput label="Name" />}
              className={classes.select}
              onChange={(e: SelectChangeEvent) =>
                setSelectedTable(e.target.value as string)
              }
            >
              {!selectedDataSource && <MenuItem>Select A Data Source</MenuItem>}
              {selectedDataSource?.tables?.map((table: any) => (
                <MenuItem key={table.name} value={table.name}>
                  {table.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <FormControl sx={{ width: 300 }} className={classes.item}>
            <InputLabel id="table-options">Fields</InputLabel>
            <Select
              className={classNames(classes.item, classes.fieldSelect)}
              labelId="table-options"
              id="demo-multiple-checkbox"
              multiple
              maxRows={1}
              value={selectedFields}
              onChange={handleChange}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => {
                return selected
                  .map((value: any) => value?.name ?? value)
                  .join(', ');
              }}
              MenuProps={MenuProps}
            >
              {fieldsLoading && <MenuItem>Loading...</MenuItem>}
              {fields?.map((field: any) => (
                <MenuItem key={field.name} value={field.name}>
                  <Checkbox checked={selectedFields.indexOf(field.name) > -1} />
                  <ListItemText primary={field.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Filters fields={fields} filters={filters} setFilters={setFilters} />
        <Box mt={4} display="flex">
          <Button variant="contained" startIcon={<SaveAsIcon />}>
            <Typography variant="h6" onClick={handleCreateQuery}>
              {loading ? 'Creating...' : 'Create Query'}
            </Typography>
          </Button>
          <Button
            variant="outlined"
            onClick={handleExecuteQuery}
            sx={{ ml: 2 }}
            startIcon={<SlideshowIcon />}
          >
            <Typography variant="h6" onClick={handleExecuteQuery}>
              {queryExecuting ? 'Fetching...' : 'Execute Query'}
            </Typography>
          </Button>
        </Box>
        <ShowData
          data={queryData}
          className={classes.showData}
          exportFileName={selectedTable as string}
        />
      </div>
    </>
  );
};

export default AddQuery;
