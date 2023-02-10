import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'src/style-system/PureLightTheme';
import theme from 'src/style-system/theme';

export const useStyles = makeStyles({
  main: {
    cursor: 'pointer',
    margin: theme.spacing(2),
    marginLeft: theme.spacing(3),
    position: 'relative',
    '&:hover': {
      backgroundColor: alpha(theme.colors.alpha.trueWhite[100], 0.06),
    },
    padding: theme.spacing(1),
  },
  list: {
    height: '400px',
    width: '270px',
  },
  button: {
    width: '100%',
    marginLeft: theme.spacing(3),
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: alpha(colors.primary.lighter, 0.5),
    },
    padding: theme.spacing(1),
  },
  paper: {
    borderRadius: '5px',
  },
});
