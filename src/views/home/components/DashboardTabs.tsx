import { Box, Tabs, Tab, Typography } from '@mui/material';
// import { TabPanel } from '@mui/lab';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';
import { SyntheticEvent, useState } from 'react';
import GroupList from './GroupList';

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
        <Box sx={{ pl: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function DashboardTabs() {
  const [value, setValue] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: 'grey' }}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          sx={{
            '&.Mui-selected': {
              color: 'white',
            },
          }}
          centered
        >
          <Tab icon={<GroupsIcon />} />
          <Tab icon={<EventIcon />} />
          <Tab icon={<DescriptionIcon />} />
        </Tabs>
      </Box>
      <Box sx={{ width: '100%', height: '100%' }}>
        <TabPanel value={value} index={0}>
          <GroupList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Calendar
        </TabPanel>
        <TabPanel value={value} index={2}>
          INvoice
        </TabPanel>
      </Box>
    </Box>
  );
}

export default DashboardTabs;
