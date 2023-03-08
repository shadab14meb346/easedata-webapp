import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    width: '250px',
    margin: theme.spacing(1),
  },
  card: {
    // minHeight: 250,
    position: 'relative',
  },
  settingsButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
