import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    marginTop: theme.spacing(2),
    '& table': {
      border: '2px solid blue',
      width: '800px',
      height: '200px',
      borderRadius: '5px',
    },
    '& tr': {
      borderBottom: '1px solid black',
    },
    '& td': {
      textAlign: 'center',
    },
  },
  select: {
    width: '30%',
  },
});
