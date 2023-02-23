import { Box, TextField, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

import { useStyles } from './useStyles';
import Operators from './Operators';
import {
  FilterType,
  operators,
  OperatorType,
  OperatorTypeLabel,
} from 'types/filter';

interface IFilterProps {
  filter: FilterType;
  handleDeleteFilter: () => void;
  handleFilterOperatorChange: (filterName: string, newOperator: any) => void;
  handleFilterValueChange: (filterName: string, newValue: string) => void;
}
const Filter = ({
  filter,
  handleDeleteFilter,
  handleFilterOperatorChange,
  handleFilterValueChange,
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
        {filter.field.label}
      </Typography>
      <Box display="flex" mt={0.5}>
        <Operators
          className={classes.filterOperator}
          operators={operators}
          onChange={(newOperator: {
            type: OperatorType;
            label: OperatorTypeLabel;
          }) => {
            handleFilterOperatorChange(filter.field.name, newOperator);
          }}
          selected={filter.operator}
        />
        {/* //TODO:handle the value change here */}
        <TextField
          className={classes.input}
          value={filter.value}
          onChange={(e) =>
            handleFilterValueChange(filter.field.name, e.target.value)
          }
        />
      </Box>
    </div>
  );
};

export default Filter;
