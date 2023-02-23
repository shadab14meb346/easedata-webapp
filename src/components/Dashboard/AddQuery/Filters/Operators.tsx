import { MenuItem, Select } from '@mui/material';

import { useStyles } from './useStyles';
import { SelectedOperator } from 'types/filter';

interface IOperatorsProps {
  operators: SelectedOperator[];
  onChange: (operator: SelectedOperator) => void;
  selected: SelectedOperator;
  className?: string;
}
const Operators = ({
  operators,
  onChange,
  className = '',
  selected,
}: IOperatorsProps) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <Select
        className={classes.filterOptions}
        onChange={(e) => {
          onChange(e.target.value as SelectedOperator);
        }}
        value={selected}
      >
        {operators.map((operator: SelectedOperator) => (
          // @ts-ignore
          <MenuItem value={operator}>{operator.label}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Operators;
