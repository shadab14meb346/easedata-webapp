import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from 'src/style-system/theme';
import { colors } from 'src/style-system/PureLightTheme';

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
  title: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: alpha(colors.primary.lighter, 0.5),
    },
    paddingLeft: theme.spacing(1),
  },
});
