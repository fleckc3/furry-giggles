import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

type Props = {
  guest?: boolean;
  onMenuClick: Dispatch<SetStateAction<any>>;
};

function DesktopNavBar({ onMenuClick, guest }: Props) {
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
      <AppBar position="fixed">
        <Toolbar>
          {guest ? (
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <EventAvailableIcon />
            </Avatar>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
              }}
              onClick={onMenuClick}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: guest ? 2 : undefined }}
          >
            Gigiddy
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            {user ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DesktopNavBar;
