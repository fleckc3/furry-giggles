import { Box, CssBaseline } from '@mui/material';

type OnboardingLayoutProps = {
  children: JSX.Element;
};

function OnboardingLayout({ children }: OnboardingLayoutProps) {
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
      <Box
        component="main"
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default OnboardingLayout;
