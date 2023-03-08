import { Box, Card, CardContent, Typography } from '@mui/material';
import { format } from 'date-fns';
import Image from 'next/image';

import { getDataSourceIcon } from 'src/utils';
import { useStyles } from './useStyles';
import Actions from './Actions';

interface IConnectionCardProp {
  type: string;
  createdAt: string;
  dataSourceId: number;
  refetch: () => void;
}
const ConnectionCard = ({
  type,
  createdAt,
  dataSourceId,
  refetch,
}: IConnectionCardProp) => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <Card variant="outlined" className={classes.card}>
        <Actions dataSourceId={dataSourceId} refetch={refetch} />
        <CardContent>
          <Box display="flex" mb={1}>
            <Image
              src={getDataSourceIcon(type)}
              width={24}
              height={24}
              alt={type}
            />
            <Typography
              ml={2}
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {type}
            </Typography>
          </Box>
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
