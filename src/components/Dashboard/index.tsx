import { Toolbar, AppBar, Button, Box, Typography } from '@mui/material';

import { useStyles } from './useStyles';
import FullLogo from '@components/common/FullLogo';
import useAuth from '@utils/useAuth';

const Dashboard = () => {
  const classes = useStyles();
  const { authState } = useAuth();

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
          <Button variant="outlined">Log Out</Button>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop={2}
      >
        <Typography variant="h6">
          Welcome to the dashboard {authState.user.email}
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;
