import * as React from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';

import DataSources from '../DataSources';
import AvailableDataSources from '../AvailableDataSources';
import FetchData from '../FetchData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const DashboardTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Add Data Sources" />
        <Tab label="Your Added Data Sources" />
        <Tab label="Fetch Data" />
      </Tabs>
      <TabPanel index={0} value={value}>
        <DataSources />
      </TabPanel>
      <TabPanel index={1} value={value}>
        <AvailableDataSources />
      </TabPanel>
      <TabPanel index={2} value={value}>
        <FetchData />
      </TabPanel>
    </Box>
  );
};

export default DashboardTabs;
