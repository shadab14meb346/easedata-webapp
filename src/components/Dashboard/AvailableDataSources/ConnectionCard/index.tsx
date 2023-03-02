import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { useStyles } from './useStyles';

interface IConnectionCardProp {
  type: string;
  createdAt: string;
}
const ConnectionCard = ({ type, createdAt }: IConnectionCardProp) => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
          </Typography>
          <Typography variant="body2">Created On</Typography>
          <Typography>
            {format(new Date(Number(createdAt)), 'MMM dd, hh:mm a')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ConnectionCard;
