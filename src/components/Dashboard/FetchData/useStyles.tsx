import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    margin: theme.spacing(4),
  },
  select: {
    width: '30%',
  },
});
