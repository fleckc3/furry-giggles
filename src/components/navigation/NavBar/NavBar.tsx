import { Box, Hidden } from "@mui/material";
import { SetStateAction, Dispatch } from "react";
import { DesktopNavBar, MobileNavBar } from "src/components/navigation/NavBar";

type Props = {
  guest?: boolean;
  onMenuClick: Dispatch<SetStateAction<any>>;
};

function NavBar({ onMenuClick }: Props) {
  return (
    <Box>
      <Hidden smDown>
        <DesktopNavBar onMenuClick={onMenuClick} />
      </Hidden>
      <Hidden smUp>
        <MobileNavBar onMenuClick={onMenuClick} />
      </Hidden>
    </Box>
  );
}

export default NavBar;
