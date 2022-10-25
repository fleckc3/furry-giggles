import { Box, Typography } from '@mui/material';

type StackedIconTextProps = {
  icon: JSX.Element;
  text: string;
};

function StackedIconText({ icon, text }: StackedIconTextProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {icon}
      <Typography variant="subtitle1" textAlign="center" gutterBottom>
        {text}
      </Typography>
    </Box>
  );
}

export default StackedIconText;
