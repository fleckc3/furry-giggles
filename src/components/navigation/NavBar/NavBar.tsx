import { Box, Hidden } from '@mui/material';
import { SetStateAction, Dispatch } from 'react';
import { DesktopNavBar, MobileNavBar } from 'src/components/navigation/NavBar';

type Props = {
  isGuest?: boolean;
  onMenuClick: Dispatch<SetStateAction<any>>;
};

function NavBar({ isGuest, onMenuClick }: Props) {
  return (
    <Box>
      <Hidden smDown>
        <DesktopNavBar guest={isGuest} onMenuClick={onMenuClick} />
      </Hidden>
      <Hidden smUp>
        <MobileNavBar guest={isGuest} onMenuClick={onMenuClick} />
      </Hidden>
    </Box>
  );
}

export default NavBar;
