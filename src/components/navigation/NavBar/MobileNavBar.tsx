import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Typography,
  Avatar,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Menu } from '@mui/icons-material';
import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

type Props = {
  guest?: boolean;
  onMenuClick: Dispatch<SetStateAction<any>>;
};

function MobileNavBar({ onMenuClick, guest }: Props) {
  const { user, logout } = useAuth();
  let navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      logout();
    } else {
      console.log('made it here');
      navigate('/sign-in');
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          {guest ? (
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              <EventAvailableIcon />
            </Avatar>
          ) : (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={onMenuClick}
            >
              <Menu />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, ml: guest ? 2 : undefined }}
          >
            Gigiddy
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit" onClick={handleClick}>
            {user ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MobileNavBar;
