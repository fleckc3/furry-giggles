import { Box, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { NavBar } from 'src/components/navigation/NavBar';

type LandingProps = {
  children: ReactNode;
};

function Landing({ children }: LandingProps) {
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
      <NavBar isGuest={true} />
      <main>{children}</main>
    </Box>
  );
}

export default Landing;
