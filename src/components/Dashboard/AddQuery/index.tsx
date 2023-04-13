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
  Button,
  Snackbar,
  AlertTitle,
  Autocomplete,
  createFilterOptions,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Portal from '@mui/base/Portal';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useStyles } from './useStyles';
import DataSourcesDropdown from '@components/common/DataSourcesDropdown';
import { useCreateQueryMutation, useExecuteQuery } from '@http/query';
import { useWorkspaceStore } from '@store/workspace';
import { useDataSourceTableFieldsQuery } from '@http/data-source';
import ShowData from '../RunQueries/ShowData';
import Filters from './Filters';
import { FilterType } from 'types/filter';
import { filterOptions } from './Filters/Filter';
import { DataSourceType } from 'types/data-source';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddQuery = () => {
  const classes = useStyles();
  const { selectedWorkspace } = useWorkspaceStore();
  const [selectedFields, setSelectedFields] = useState<any[]>([]);
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
    pageInfo,
    reset,
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

  useEffect(() => {
    reset();
  }, [selectedWorkspace?.id]);

  useEffect(() => {
    reset();
  }, [selectedFields]);

  const handleExecuteQuery = () => {
    if (!selectedDataSource || !selectedTable) return;
    executeQuery({
      data_source_id: Number(selectedDataSource?.id),
      fields: selectedFields.map((filed) => filed.name),
      table_name: selectedTable,
      filters: filters.map((filter) => {
        const { field, operator, value, highValue } = filter;
        return {
          field: field.name,
          // @ts-ignore
          operator: operator.type,
          value,
          ...(highValue && { high_value: highValue }),
        };
      }),
    });
  };

  const handleDataSourceSelect = (selectedDataSource: any) => {
    setSelectedDataSource(selectedDataSource);
  };
  const handleCreateQuery = () => {
    createQuery({
      name: queryName,
      fields: selectedFields.map((filed) => filed.name),
      data_source_id: Number(selectedDataSource?.id),
      table_name: selectedTable as string,
      workspace_id: Number(selectedWorkspace?.id),
      description: '',
    });
  };
  const handleLoadMore = () => {
    if (!selectedDataSource || !selectedTable) return;
    if (pageInfo?.has_next_page) {
      executeQuery({
        data_source_id: Number(selectedDataSource?.id),
        fields: selectedFields.map((filed) => filed.name),
        table_name: selectedTable,
        filters: filters.map((filter) => {
          const { field, operator, value, highValue } = filter;
          return {
            field: field.name,
            // @ts-ignore
            operator: operator.type,
            value,
            ...(highValue && { high_value: highValue }),
          };
        }),
        after: pageInfo?.end_cursor,
      });
    }
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
          {selectedDataSource?.type === DataSourceType.GoogleAnalytics && (
            <>
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
                  {!selectedDataSource && (
                    <MenuItem>Select A Data Source</MenuItem>
                  )}
                  {selectedDataSource?.tables?.map((table: any) => (
                    <MenuItem key={table.name} value={table.name}>
                      {table.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ width: 300 }} className={classes.item}>
                <InputLabel id="table-options">Select Fields</InputLabel>
                <Autocomplete
                  limitTags={1}
                  filterOptions={filterOptions}
                  multiple
                  loading={fieldsLoading}
                  options={fields}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.label}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                  value={selectedFields}
                  onChange={(event: any, newValue: any) => {
                    setSelectedFields(newValue);
                  }}
                  sx={{ width: '300px' }}
                />
              </Box>
            </>
          )}
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
            <Typography variant="h6">
              {queryExecuting ? 'Fetching...' : 'Execute Query'}
            </Typography>
          </Button>
        </Box>
        <ShowData
          dataLoading={queryExecuting}
          data={queryData}
          className={classes.showData}
          exportFileName={selectedTable as string}
          pageInfo={pageInfo}
          handleLoadMore={handleLoadMore}
        />
      </div>
    </>
  );
};

export default AddQuery;
