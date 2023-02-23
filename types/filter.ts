import { Filed } from '@components/Dashboard/AddQuery/Filters';

//the right hand side value will be what is expected in the graphql query
export enum OperatorType {
  IS_EQUAL_TO = 'EQ',
  GREATER_THAN = 'GT',
  GREATER_THAN_OR_EQUAL_TO = 'GTE',
}
export enum OperatorTypeLabel {
  IS_EQUAL_TO = 'is equal to',
  GREATER_THAN = 'greater than',
  GREATER_THAN_OR_EQUAL_TO = 'greater than or equal to',
}
export type FilterType = {
  field: Filed;
  value: string;
  operator: { type: OperatorType; label: OperatorTypeLabel };
};
export const operators = [
  {
    type: OperatorType.GREATER_THAN,
    label: OperatorTypeLabel.GREATER_THAN,
  },
  {
    type: OperatorType.IS_EQUAL_TO,
    label: OperatorTypeLabel.IS_EQUAL_TO,
  },
  {
    type: OperatorType.GREATER_THAN_OR_EQUAL_TO,
    label: OperatorTypeLabel.GREATER_THAN_OR_EQUAL_TO,
  },
];

export type SelectedOperator = {
  type: OperatorType;
  label: OperatorTypeLabel;
};
