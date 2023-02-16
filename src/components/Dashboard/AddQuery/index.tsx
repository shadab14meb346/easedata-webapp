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
  styled,
  InputBase,
  alpha,
  Snackbar,
  AlertTitle,
} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Portal from '@mui/base/Portal';

import { useStyles } from './useStyles';
import useAuth from '@utils/useAuth';
import AvailableDataSources from '../AvailableDataSources';
import DataSourcesDropdown from '@components/common/DataSourcesDropdown';
import classNames from 'classnames';
import { forwardRef, useEffect, useState } from 'react';
import { useCreateQueryMutation } from '@http/query';
import { useWorkspaceStore } from '@store/workspace';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
type SelectedFields = {
  name: string;
  value: string;
};
const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddQuery = () => {
  const classes = useStyles();
  const { authState } = useAuth();
  const { selectedWorkspace } = useWorkspaceStore();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [queryName, setQueryName] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { loading, error, data, createQuery } = useCreateQueryMutation();
  useEffect(() => {
    console.log({ loading, data, error });
    if (data?.id && !error) {
      setShowAlert(true);
    }
  }, [loading, data, error]);

  const handleDataSourceSelect = (value?: string) => {};
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
      data_source_id: 1,
      table_name: 'contacts',
      workspace_id: Number(selectedWorkspace?.id),
      description: '',
    });
  };

  const tablesOptions = [
    {
      label: 'Contacts',
      id: 'contacts',
    },
  ];
  const fields = [
    {
      name: 'First Name',
      value: 'firstname',
    },
    {
      name: 'Last Name',
      value: 'lastname',
    },
    {
      name: 'Created At',
      value: 'createdate',
    },
  ];
  return (
    <>
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
            >
              {tablesOptions?.map((table: any) => (
                <MenuItem key={table.id} value={table.id}>
                  {table.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className={classes.item}>
            <InputLabel id="table-options">Fields</InputLabel>
            <Select
              className={classes.item}
              labelId="table-options"
              id="demo-multiple-checkbox"
              multiple
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
              {fields.map((field) => (
                <MenuItem key={field.value} value={field.value}>
                  <Checkbox
                    checked={selectedFields.indexOf(field.value) > -1}
                  />
                  <ListItemText primary={field.name} />
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box mt={4} display="flex">
          <Button variant="contained">
            <Typography variant="h6" onClick={handleCreateQuery}>
              {loading ? 'Creating...' : 'Create Query'}
            </Typography>
          </Button>
          {/* <Button variant="contained" sx={{ marginLeft: 2 }}>
          <Typography variant="h6">Execute Query</Typography>
        </Button> */}
        </Box>
      </div>
    </>
  );
};

export default AddQuery;
