import { Box, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

import { useStyles } from './useStyles';
import Operators from './Operators';
import {
  FilterType,
  getOperatorsForDataType,
  OperatorDataType,
  OperatorType,
  OperatorTypeLabel,
} from 'types/filter';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

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
  const getFieldsRightFormatValue = (value: string) => {
    if (filter.field.data_type === OperatorDataType.DATE) {
      return dayjs(Number(filter.value)).format('YYYY-MM-DD');
    }
    return value;
  };
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
          operators={getOperatorsForDataType(filter.field.data_type)}
          onChange={(newOperator: {
            type: OperatorType;
            label: OperatorTypeLabel;
          }) => {
            handleFilterOperatorChange(filter.field.name, newOperator);
          }}
          selected={filter.operator}
        />
        {filter?.field?.data_type !== OperatorDataType.DATE && (
          <TextField
            className={classes.input}
            value={getFieldsRightFormatValue(filter.value)}
            onChange={(e) =>
              handleFilterValueChange(filter.field.name, e.target.value)
            }
          />
        )}
        {filter?.field?.data_type === OperatorDataType.DATE && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className={classes.input}
              label="Date"
              value={getFieldsRightFormatValue(filter.value)}
              // TODO:Fix this value change logic for date picker
              onChange={(newValue) => {
                handleFilterValueChange(filter.field.name, newValue as any);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
      </Box>
    </div>
  );
};

export default Filter;
