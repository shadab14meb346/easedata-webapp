import { Typography } from '@mui/material';
import DataObjectIcon from '@mui/icons-material/DataObject';

import { useStyles } from './useStyles';
import classNames from 'classnames';

interface IFullLogoProps {
  className?: string;
}
const FullLogo = ({ className = '' }: IFullLogoProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.main, className)}>
      <DataObjectIcon
        color="primary"
        fontSize="large"
        sx={{ marginRight: 2 }}
      />
      <Typography variant="h6" color="primary">
        EaseData
      </Typography>
    </div>
  );
};

export default FullLogo;
