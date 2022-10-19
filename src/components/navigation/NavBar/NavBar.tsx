import { Box } from '@mui/material';
import { DesktopNavBar } from 'src/components/navigation/NavBar';

type Props = {
  isGuest?: boolean;
};

function NavBar({ isGuest }: Props) {
  return (
    <Box>
      <DesktopNavBar guest={isGuest} />
    </Box>
  );
}

export default NavBar;
