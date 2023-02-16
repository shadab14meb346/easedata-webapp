import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    minWidth: '200px',
    marginRight: theme.spacing(2),
  },
  select: {
    width: '100%',
  },
});
