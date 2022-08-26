import { Box, Typography } from "@mui/material";

function Chat() {
  return (
    <Box
      sx={{
        height: "100%",
        width: 300,
        backgroundColor: "background.paper",
        pt: {
          xs: "none",
          sm: "64px",
        },
      }}
    >
      <Typography variant="h4">Chat</Typography>
    </Box>
  );
}

export default Chat;
