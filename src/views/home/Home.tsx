import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GroupList from './components/GroupList';
// import DashboardTabs from './components/DashboardTabs';

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
      <Fab
        sx={{ position: 'absolute', bottom: '40px', right: 10 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
      <GroupList />
    </Box>
  );
}

export default Home;
