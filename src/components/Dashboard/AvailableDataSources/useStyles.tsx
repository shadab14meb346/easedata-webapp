import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
  },
});
