import { Box, Hidden } from "@mui/material";
import { SetStateAction, Dispatch } from "react";
import { DesktopNavBar, MobileNavBar } from "src/components/navigation/NavBar";

type Props = {
  guest?: boolean;
  onMenuClick: Dispatch<SetStateAction<any>>;
};

function NavBar({ onMenuClick, guest }: Props) {
  return (
    <Box>
      <Hidden smDown>
        <DesktopNavBar onMenuClick={onMenuClick} guest />
      </Hidden>
      <Hidden smUp>
        <MobileNavBar onMenuClick={onMenuClick} guest />
      </Hidden>
    </Box>
  );
}

export default NavBar;
