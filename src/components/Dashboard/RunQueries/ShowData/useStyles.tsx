import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    width: '100%',
    maxWidth: 1000,
    overflowX: 'auto',
    marginTop: theme.spacing(1),
  },
  materialTable: {
    '& .MuiTableFooter-root': {
      position: 'absolute',
      bottom: 0,
    },
    '& .MuiPaper-root': {
      border: '1px solid red',
    },
  },
});
