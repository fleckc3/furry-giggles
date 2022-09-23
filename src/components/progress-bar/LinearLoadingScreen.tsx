import { Box, LinearProgress } from '@mui/material';

function LinerLoadingScreen() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={theme => ({
          width: 400,
          [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: theme.spacing(0, 6),
          },
        })}
      >
        <LinearProgress />
      </Box>
    </Box>
  );
}

export default LinerLoadingScreen;
