import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'src/style-system/PureLightTheme';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  filterMain: {
    marginLeft: theme.spacing(2),
    borderRadius: 10,
    padding: theme.spacing(1),
    position: 'relative',
    border: `1px solid ${colors.primary.lighter}`,
    backgroundColor: alpha(colors.primary.lighter, 0.4),
  },
  filterDelete: {
    position: 'absolute',
    top: 5,
    right: 5,
    cursor: 'pointer',
  },
  select: {
    '& .MuiSelect-select': {
      padding: theme.spacing(1),
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    '& .MuiInputBase-input': {
      padding: theme.spacing(1),
    },
  },
  fieldTitle: {
    fontWeight: 600,
  },
  filterOptions: {
    width: '100%',
  },
  operators: {
    marginTop: theme.spacing(2),
  },
  filterOperator: {
    '& .MuiSelect-select': {
      padding: theme.spacing(1),
    },
  },
  datePicker: {
    maxWidth: 160,
  },
});
