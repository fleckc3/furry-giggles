import { NavBar } from "src/components/navigation/NavBar";
import { Box } from "@mui/system";
import {
  DesktopSideDrawer,
  MobileSideDrawer,
} from "src/components/navigation/SideDrawer";
import { CssBaseline } from "@mui/material";
import { useState } from "react";

type Props = {
    children: JSX.Element;
}

function AuthLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen((prev) => !prev);
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flex: "1 1 auto",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <NavBar onMenuClick={handleMenuClick} guest />
      <DesktopSideDrawer isOpen={isOpen} close={() => setIsOpen(false)} />
      <MobileSideDrawer
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      />
      <main>{children}</main>
    </Box>
  );
}

export default AuthLayout;
