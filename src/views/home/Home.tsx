import { Box } from '@mui/material';
import DashboardTabs from './components/DashboardTabs';

function Home() {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <DashboardTabs />
    </Box>
  );
}

export default Home;
