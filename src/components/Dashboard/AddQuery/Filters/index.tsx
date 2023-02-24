import {
  Autocomplete,
  Box,
  BoxProps,
  Button,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useStyles } from './useStyles';
import { useState } from 'react';
import Filter from './Filter';
import {
  FilterType,
  getOperatorsForDataType,
  OperatorDataType,
  SelectedOperator,
} from 'types/filter';
import Operators from './Operators';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

interface IFilterProps extends BoxProps {
  fields: { name: string; label: string }[];
  filters: FilterType[];
  setFilters: (filters: FilterType[]) => void;
}
export type Filed = {
  label: string;
  name: string;
  data_type: OperatorDataType;
};

const Filters = ({ fields, filters, setFilters, ...props }: IFilterProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedField, setSelectedField] = useState<Filed | null>(null);
  const [selectedFieldValue, setSelectedFieldValue] = useState<string>('');
  const [selectedOperator, setSelectedOperator] =
    useState<SelectedOperator | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddFilter = () => {
    const filter = {
      field: selectedField,
      value: selectedFieldValue,
      operator: selectedOperator,
    };
    if (selectedField?.data_type === OperatorDataType.DATE) {
      // @ts-ignore
      filter.value = String(Date.parse(new Date(selectedFieldValue)));
    }
    // @ts-ignore
    setFilters((prev) => [...prev, filter]);
  };
  const handleDeleteFilter = (index: number) => {
    // @ts-ignore
    setFilters((prev: any) => prev.filter((_, i) => i !== index));
  };
  const handleFilterOperatorChange = (
    filterName: string,
    newOperator: SelectedOperator
  ) => {
    // @ts-ignore
    setFilters((prev: any) =>
      prev.map((filter: any) => {
        if (filter.field.name === filterName) {
          return { ...filter, operator: newOperator };
        }
        return filter;
      })
    );
  };
  const handleFilterValueChange = (filterName: string, value: string) => {
    // @ts-ignore
    setFilters((prev: FilterType[]) =>
      prev.map((filter: FilterType) => {
        if (filter.field.name === filterName) {
          return { ...filter, value };
        }
        return filter;
      })
    );
  };

  return (
    <Box display="flex" alignItems="center" mt={2} {...props}>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        variant="outlined"
        startIcon={<FilterListIcon />}
      >
        <Typography variant="h6">Filters</Typography>
      </Button>
      <Box display="flex" alignItems="center">
        {filters.map((filter, index) => (
          <Filter
            filter={filter}
            handleDeleteFilter={() => {
              handleDeleteFilter(index);
            }}
            handleFilterOperatorChange={handleFilterOperatorChange}
            handleFilterValueChange={handleFilterValueChange}
          />
        ))}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box padding={2}>
          <Autocomplete
            id="combo-box-demo"
            options={fields}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Field" />}
            //@ts-ignore
            value={selectedField}
            onChange={(event: any, newValue: any) => {
              setSelectedField(newValue);
            }}
          />
          <Operators
            className={classes.operators}
            operators={getOperatorsForDataType(
              selectedField?.data_type as OperatorDataType
            )}
            onChange={(operator) => {
              setSelectedOperator(operator);
            }}
            selected={selectedOperator as SelectedOperator}
          />
          <Box my={2} width="100%">
            {selectedField?.data_type !== OperatorDataType.DATE && (
              <TextField
                label="value"
                style={{ width: '100%' }}
                value={selectedFieldValue}
                onChange={(e) => {
                  setSelectedFieldValue(e.target.value);
                }}
              />
            )}
            {selectedField?.data_type === OperatorDataType.DATE && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={selectedFieldValue}
                  onChange={(newValue) => {
                    setSelectedFieldValue(newValue as string);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            )}
          </Box>
          <Box>
            <Button variant="contained" onClick={handleAddFilter}>
              Add
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ marginLeft: 2 }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default Filters;
