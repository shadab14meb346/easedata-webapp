import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useStyles } from './useStyles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IFieldsDrownProps {
  fields: any[];
  selectedFields: string[];
  onFieldsChange: (fields: string[]) => void;
}
const FieldsDropdown = ({
  fields,
  selectedFields,
  onFieldsChange,
}: IFieldsDrownProps) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selectedFieldsName = value.map((value: any) => value?.name ?? value);
    if (selectedFieldsName[selectedFieldsName.length - 1] === 'ALL_SELECTED') {
      const allAvailableFields = fields.map(
        (value: any) => value?.name ?? value
      );
      const isAllAvailableFieldsSelected =
        allAvailableFields?.length === selectedFields?.length;
      onFieldsChange(isAllAvailableFieldsSelected ? [] : allAvailableFields);
      return;
    }
    onFieldsChange(selectedFieldsName);
  };

  return (
    <FormControl className={classes.item} sx={{ width: 300 }}>
      <InputLabel id="table-options">Fields</InputLabel>
      <Select
        className={classes.item}
        labelId="table-options"
        id="demo-multiple-checkbox"
        multiple
        value={selectedFields}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => {
          return selected.map((value: any) => value?.name ?? value).join(', ');
        }}
        MenuProps={MenuProps}
      >
        {!fields?.length && (
          <MenuItem value="">
            <ListItemText primary="Select A Query First" />
          </MenuItem>
        )}
        {fields?.length && (
          <MenuItem value="ALL_SELECTED">
            <Checkbox
              checked={
                fields?.length > 0 && selectedFields?.length === fields?.length
              }
            />
            <ListItemText primary="Select All" />
          </MenuItem>
        )}
        {fields?.map((field) => (
          <MenuItem key={field.value} value={field.value}>
            <Checkbox checked={selectedFields.indexOf(field.value) > -1} />
            <ListItemText primary={field.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default FieldsDropdown;
