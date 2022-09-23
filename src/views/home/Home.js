import { Box, Container, Typography } from '@mui/material';

function Home() {
  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container>
        <Typography textAlign="center" variant="h4">
          Welcome Home
        </Typography>
        {/* <TestLogin /> */}
      </Container>
    </Box>
  );
}

export default Home;
