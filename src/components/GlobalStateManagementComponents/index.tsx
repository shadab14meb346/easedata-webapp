import { Box } from '@mui/material';
import { UpdateComponent } from './UpdateComponent';
import { ViewComponent } from './ViewComponent';

const GlobalStateManagementComponents = () => {
  return (
    <Box>
      <ViewComponent />
      <UpdateComponent />
    </Box>
  );
};

export default GlobalStateManagementComponents;
