import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    margin: theme.spacing(4),
    display: 'flex',
    alignItems: 'flex-end',
  },
  select: {
    width: '100%',
  },
  item: {
    minWidth: '200px',
    marginRight: theme.spacing(2),
  },
  showData: {
    marginLeft: theme.spacing(4),
  },
});
