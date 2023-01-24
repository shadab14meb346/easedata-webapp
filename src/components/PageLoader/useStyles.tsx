import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  mainContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    display: 'flex',
    animation: `$spin 2s linear infinite`,
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});
