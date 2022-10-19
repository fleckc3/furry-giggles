import { NavBar } from 'src/components/navigation/NavBar';
import { Box } from '@mui/system';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';

type Props = {
  children: JSX.Element;
};

function AuthLayout({ children }: Props) {
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
      <main>{children}</main>
    </Box>
  );
}

export default AuthLayout;
