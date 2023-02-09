import { Toolbar, AppBar, Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import FullLogo from '@components/common/FullLogo';
import useAuth from '@utils/useAuth';
import DataSources from './DataSources';
import AvailableDataSources from './AvailableDataSources';
import DashboardTabs from './DashboardTabs';

const LoggedInHome = () => {
  const classes = useStyles();
  const { authState, setAuthState } = useAuth();
  const handleLogout = () => {
    setAuthState({});
    localStorage.removeItem('user');
    localStorage.removeItem('jwt-token');
  };

  return <></>;
};

export default LoggedInHome;
