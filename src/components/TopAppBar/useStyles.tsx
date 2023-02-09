import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  lhs: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  appBar: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderBottom: '1px solid rgba(111, 111, 147, 0.8)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0),
    },
  },
});
