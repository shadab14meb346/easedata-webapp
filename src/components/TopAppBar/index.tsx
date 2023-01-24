import { Toolbar, AppBar, Button } from '@mui/material';
import * as ROUTES from 'src/constants/routes';

import { useStyles } from './useStyles';
import FullLogo from '@components/common/FullLogo';

const TopAppBar = () => {
  const classes = useStyles();

  return (
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
        <Button
          variant="outlined"
          sx={{ marginRight: 2 }}
          href={ROUTES.SIGN_IN}
        >
          login
        </Button>
        <Button variant="contained" href={ROUTES.SIGN_UP}>
          sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopAppBar;
