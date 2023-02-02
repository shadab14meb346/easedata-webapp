import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useStyles } from './useStyles';

interface IConnectionCardProp {
  type: string;
  createdAt: string;
}
const ConnectionCard = ({ type, createdAt }: IConnectionCardProp) => {
  const classes = useStyles();
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className={classes.card}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {type}
          </Typography>
          <Typography variant="caption">Created</Typography>
          <Typography variant="caption">{createdAt}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ConnectionCard;