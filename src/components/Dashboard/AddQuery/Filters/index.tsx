import {
  Autocomplete,
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useStyles } from './useStyles';
import { useState } from 'react';
import Filter from './Filter';
import { OperatorType, OperatorTypeLabel } from 'types/filter';
import Operators from './Operators';

interface IFilterProps {
  fields: { name: string; label: string }[];
  filters: Filter[];
  setFilters: (filters: Filter[]) => void;
}
export type Filed = {
  label: string;
  name: string;
};
export type Filter = {
  field: Filed;
  value: string;
  operator: OperatorType;
};
export const operators = [
  {
    type: OperatorType.GREATER_THAN,
    label: OperatorTypeLabel.GREATER_THAN,
  },
];
const Filters = ({ fields, filters, setFilters }: IFilterProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedField, setSelectedField] = useState<Filed | null>(null);
  const [selectedFieldValue, setSelectedFieldValue] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<{
    type: OperatorType;
    label: OperatorTypeLabel;
  } | null>(null);
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
    // @ts-ignore
    setFilters((prev) => [...prev, filter]);
  };
  const handleDeleteFilter = (index: number) => {
    // @ts-ignore
    setFilters((prev: any) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
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
            {...filter}
            handleDeleteFilter={() => {
              handleDeleteFilter(index);
            }}
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
        <Box style={{ minHeight: 300 }} padding={2}>
          <Autocomplete
            disablePortal
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
            operators={operators}
            onChange={(operator) => {
              setSelectedOperator(operator);
            }}
            //@ts-ignore
            selected={selectedOperator}
          />
          <Box my={2} width="100%">
            <TextField
              label="value"
              style={{ width: '100%' }}
              value={selectedFieldValue}
              onChange={(e) => {
                setSelectedFieldValue(e.target.value);
              }}
            />
          </Box>
          <Button variant="contained" onClick={handleAddFilter}>
            Add
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default Filters;
