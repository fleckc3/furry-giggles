import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        pt: '100px',
      }}
    >
      <Container>
        <Typography variant="h2" textAlign="center" gutterBottom>
          Welcome to Gigiddy
        </Typography>
        <Avatar
          sx={{
            bgcolor: 'secondary.main',
            width: 60,
            height: 60,
            mx: 'auto',
            mb: 2,
          }}
        >
          <EventAvailableIcon fontSize="large" />
        </Avatar>
        <Stack spacing={2} alignItems="center">
          <Button
            sx={{ minWidth: '120px' }}
            variant="contained"
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button
            sx={{ minWidth: '120px' }}
            variant="outlined"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default LandingPage;
