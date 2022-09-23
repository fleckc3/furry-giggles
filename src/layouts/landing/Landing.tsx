import { Box, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import { NavBar } from 'src/components/navigation/NavBar';
import {
  DesktopSideDrawer,
  MobileSideDrawer,
} from 'src/components/navigation/SideDrawer';
import { useState } from 'react';

type LandingProps = {
  children: ReactNode;
};

function Landing({ children }: LandingProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(prev => !prev);
  };
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
      <NavBar isGuest={true} onMenuClick={handleMenuClick} />
      <DesktopSideDrawer isOpen={isOpen} close={() => setIsOpen(false)} />
      <MobileSideDrawer
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <main>{children}</main>
    </Box>
  );
}

export default Landing;
