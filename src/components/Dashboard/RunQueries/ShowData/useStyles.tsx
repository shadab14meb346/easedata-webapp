import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  main: {
    '& table': {
      border: '2px solid blue',
      width: '400px',
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
});
