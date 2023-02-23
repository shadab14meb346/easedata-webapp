import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import { useStyles } from './useStyles';
import { Filed, operators } from '.';
import { OperatorType, OperatorTypeLabel } from 'types/filter';
import Operators from './Operators';

interface IFilterProps {
  field: Filed;
  value: string;
  operator: OperatorType;
  handleDeleteFilter: () => void;
}
const Filter = ({
  field,
  value,
  operator,
  handleDeleteFilter,
}: IFilterProps) => {
  const classes = useStyles();
  return (
    <div className={classes.filterMain}>
      <DeleteIcon
        className={classes.filterDelete}
        fontSize="small"
        onClick={handleDeleteFilter}
      />
      <Typography variant="body2" className={classes.fieldTitle}>
        {field.label}
      </Typography>
      <Box display="flex" mt={0.5}>
        <Operators
          className={classes.filterOperator}
          operators={operators}
          onChange={(operator: any) => {
            //TODO: handle change
          }}
          // @ts-ignore
          selected={operator}
        />
        {/* //TODO:handle the value change here */}
        <TextField className={classes.input} value={value} />
      </Box>
    </div>
  );
};

export default Filter;
