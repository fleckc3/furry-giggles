import { Box, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import Message from './Message';

function Chat() {
  const scroll = useRef();
  return (
    <Box
      sx={{
        height: '100%',
        width: 800,
        backgroundColor: 'background.paper',
        p: 1,
      }}
    >
      {/* chat messages view component */}
      <Message />
      {/* send message component */}
      <Box ref={scroll}></Box>
    </Box>
  );
}

export default Chat;
