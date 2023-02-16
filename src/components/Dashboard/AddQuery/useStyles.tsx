import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    margin: theme.spacing(4),
  },
  select: {
    width: '100%',
  },
  form: {
    '& ~ div': {
      marginRight: '10px',
    },
    border: '1px solid #ccc',
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  item: {
    minWidth: '200px',
    marginRight: theme.spacing(2),
  },
  formHelperText: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#223354',
    opacity: 0.7,
  },
});
