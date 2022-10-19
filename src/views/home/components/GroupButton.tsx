import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

function GroupButton() {
  return (
    <Button
      startIcon={<Avatar sx={{ bgcolor: deepOrange[500] }}>M</Avatar>}
      sx={{ height: '60px', justifyContent: 'flex-start' }}
      fullWidth
    >
      Murrays
    </Button>
  );
}

export default GroupButton;
