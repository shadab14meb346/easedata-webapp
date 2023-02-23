import { MenuItem, Select } from '@mui/material';

import { useStyles } from './useStyles';
import { useState } from 'react';
import { OperatorType, OperatorTypeLabel } from 'types/filter';

interface IOperatorsProps {
  operators: { type: OperatorType; label: OperatorTypeLabel }[];
  onChange: (operator: {
    type: OperatorType;
    label: OperatorTypeLabel;
  }) => void;
  selected: { type: OperatorType; label: OperatorTypeLabel };
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
          onChange(e.target.value as any);
        }}
        value={selected}
      >
        {operators.map((operator) => (
          // @ts-ignore
          <MenuItem value={operator}>{operator.label}</MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default Operators;
