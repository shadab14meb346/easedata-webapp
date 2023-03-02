import { Filed } from '@components/Dashboard/AddQuery/Filters';

//the right hand side value will be what is expected in the graphql query
export enum OperatorType {
  IS_NOT_EMPTY = 'IS_NOT_EMPTY',
  IS_EMPTY = 'IS_EMPTY',
  IS_EXACTLY = 'EQ',
  IS_EQUAL_TO = 'EQ',
  GREATER_THAN = 'GT',
  GREATER_THAN_OR_EQUAL_TO = 'GTE',
  LESS_THAN = 'LT',
  LESS_THAN_OR_EQUAL_TO = 'LTE',
  IS_NOT_EQUAL_TO = 'NEQ',
  //the operator for the 'is within' is not yet defined
  IS_WITHIN = 'is within',
  BETWEEN = 'BETWEEN',
}
export enum OperatorTypeLabel {
  IS_NOT_EMPTY = 'is not empty',
  IS_EMPTY = 'is empty',
  IS_EXACTLY = 'is exactly',
  GREATER_THAN = 'greater than',
  GREATER_THAN_OR_EQUAL_TO = 'greater than or equal to',
  IS_EQUAL_TO = 'is equal to',
  LESS_THAN = 'less than',
  LESS_THAN_OR_EQUAL_TO = 'less or equal to',
  IS_NOT_EQUAL_TO = 'is not equal to',
  IS_WITHIN = 'is within',
  BETWEEN = 'between',
}
export type FilterType = {
  field: Filed;
  value: string;
  highValue?: string;
  operator: { type: OperatorType; label: OperatorTypeLabel };
};
export enum OperatorDataType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
}
const operatorsForDateDataType = [
  {
    type: OperatorType.BETWEEN,
    label: OperatorTypeLabel.BETWEEN,
  },
  //TODO: add for 'is not empty', 'is empty', 'contains', 'does not contain'
];
const operatorsForDataNumberDataType = [
  {
    type: OperatorType.IS_EQUAL_TO,
    label: OperatorTypeLabel.IS_EQUAL_TO,
  },
  {
    type: OperatorType.GREATER_THAN,
    label: OperatorTypeLabel.GREATER_THAN,
  },
  {
    type: OperatorType.GREATER_THAN_OR_EQUAL_TO,
    label: OperatorTypeLabel.GREATER_THAN_OR_EQUAL_TO,
  },
  {
    type: OperatorType.LESS_THAN,
    label: OperatorTypeLabel.LESS_THAN,
  },
  {
    type: OperatorType.LESS_THAN_OR_EQUAL_TO,
    label: OperatorTypeLabel.LESS_THAN_OR_EQUAL_TO,
  },
  {
    type: OperatorType.IS_NOT_EQUAL_TO,
    label: OperatorTypeLabel.IS_NOT_EQUAL_TO,
  },
  //TODO: add for 'is not empty', 'is empty'
];

const operatorsForTextDataType = [
  {
    type: OperatorType.IS_EXACTLY,
    label: OperatorTypeLabel.IS_EXACTLY,
  },
];
export const getOperatorsForDataType = (dataType: OperatorDataType) => {
  switch (dataType) {
    case OperatorDataType.NUMBER:
      return operatorsForDataNumberDataType;
    case OperatorDataType.TEXT:
      return operatorsForTextDataType;
    case OperatorDataType.DATE:
      return operatorsForDateDataType;
    default:
      return [];
  }
};
export const getFieldDataType = (field: Filed) => {
  const fieldName = field.name;
  if (
    fieldName.includes('year') ||
    fieldName.includes('data') ||
    fieldName.includes('create')
  ) {
    return OperatorDataType.DATE;
  }
  return OperatorDataType.TEXT;
};
export type SelectedOperator = {
  type: OperatorType;
  label: OperatorTypeLabel;
};

export const operators = operatorsForDataNumberDataType;
