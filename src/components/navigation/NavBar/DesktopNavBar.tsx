import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { SetStateAction, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

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
      console.log("made it here");
      navigate("sign-in");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gigiddy
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            {user ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DesktopNavBar;
