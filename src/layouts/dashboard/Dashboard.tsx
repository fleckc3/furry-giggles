import { NavBar } from 'src/components/navigation/NavBar';
import { Box, CssBaseline } from '@mui/material';

type Props = {
  children: JSX.Element;
};

function Dashboard({ children }: Props) {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          pt: {
            xs: '56px',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Dashboard;
