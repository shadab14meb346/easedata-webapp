import {
  Box,
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import { useState } from 'react';
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
}
const FieldsDropdown = ({ fields }: IFieldsDrownProps) => {
  const classes = useStyles();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selectedFiendsName = value.map((value: any) => value?.name ?? value);
    setSelectedFields(selectedFiendsName);
  };
  return (
    <Box className={classes.item}>
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
        {fields?.map((field) => (
          <MenuItem key={field.value} value={field.value}>
            <Checkbox checked={selectedFields.indexOf(field.value) > -1} />
            <ListItemText primary={field.name} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
export default FieldsDropdown;
