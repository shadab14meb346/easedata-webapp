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
import { FilterValueChangeInput } from '.';
import classNames from 'classnames';

interface IFilterProps {
  filter: FilterType;
  handleDeleteFilter: () => void;
  handleFilterOperatorChange: (filterName: string, newOperator: any) => void;
  handleFilterValueChange: (input: FilterValueChangeInput) => void;
  handleFilterHighValueChange: (input: any) => void;
}
const Filter = ({
  filter,
  handleDeleteFilter,
  handleFilterOperatorChange,
  handleFilterValueChange,
  handleFilterHighValueChange,
}: IFilterProps) => {
  const classes = useStyles();
  const getFieldsRightFormatValue = (value: string) => {
    if (filter.field.data_type === OperatorDataType.DATE) {
      return dayjs(Number(value)).format('YYYY-MM-DD');
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
              handleFilterValueChange({
                filterName: filter.field.name,
                value: e.target.value,
              })
            }
          />
        )}
        {filter?.field?.data_type === OperatorDataType.DATE && (
          <Box display="flex" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={classNames(classes.input, classes.datePicker)}
                label="From"
                value={getFieldsRightFormatValue(filter.value)}
                onChange={(newValue) => {
                  handleFilterValueChange({
                    filterName: filter.field.name,
                    //@ts-ignore
                    value: String(Date.parse(new Date(newValue))),
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <Typography ml={1}>To</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className={classNames(classes.input, classes.datePicker)}
                label="Till"
                value={getFieldsRightFormatValue(filter.highValue as string)}
                onChange={(newValue) => {
                  // setSecondaryDateFieldValue(newValue as string);
                  handleFilterHighValueChange({
                    filterName: filter.field.name,
                    //@ts-ignore
                    highValue: String(Date.parse(new Date(newValue))),
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default Filter;
