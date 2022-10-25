import { Box } from '@mui/material';
import GroupButton from './GroupButton';

function GroupList() {
  return (
    <Box sx={{ width: '100%', height: '100%', px: 1 }}>
      <GroupButton />
      <GroupButton />
      <GroupButton />
      <GroupButton />
      <GroupButton />
      <GroupButton />
      <GroupButton />
      <GroupButton />
    </Box>
  );
}

export default GroupList;
