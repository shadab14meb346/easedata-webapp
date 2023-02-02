import { Toolbar, AppBar, Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import FullLogo from '@components/common/FullLogo';
import useAuth from '@utils/useAuth';
import DataSources from './DataSources';

const Dashboard = () => {
  const classes = useStyles();
  const { authState, setAuthState } = useAuth();
  const handleLogout = () => {
    setAuthState({});
    localStorage.removeItem('user');
    localStorage.removeItem('jwt-token');
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.lhs}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                maxWidth: '110px',
              }}
            >
              <FullLogo />
            </div>
          </div>
          <Button variant="outlined" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        marginTop={2}
      >
        <Typography variant="h6">
          Welcome to the dashboard {authState.user.email}
        </Typography>
        <DataSources />
      </Box>
    </>
  );
};

export default Dashboard;
