import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

type DesktopNavBarProps = {
  guest?: boolean;
};

function DesktopNavBar({ guest }: DesktopNavBarProps) {
  const { user, logout } = useAuth();
  let navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      logout();
    } else {
      navigate('sign-in');
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <EventAvailableIcon />
          </Avatar>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gigiddy
          </Typography>
          {!guest && (
            <Button color="inherit" onClick={handleClick}>
              {user ? 'Logout' : 'Login'}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DesktopNavBar;
