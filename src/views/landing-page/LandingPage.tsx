import { Box, Typography } from "@mui/material";
import React from "react";

function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        pt: "100px",
      }}
    >
      <Typography variant="h2">Welcome to Gigiddy</Typography>
    </Box>
  );
}

export default LandingPage;
