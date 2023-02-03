import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(1),
    '& table': {
      border: '2px solid forestgreen',
      width: '800px',
      height: '200px',
    },
    '& tr': {
      borderBottom: '1px solid black',
    },
    '& td': {
      textAlign: 'center',
    },
  },
  select: {
    width: '100%',
  },
});
