import { Stack, Divider, Box } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import GroupsIcon from '@mui/icons-material/Groups';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import StackedIconText from './StackedIconText';

function FeatureIconRow() {
  const iconsWithText = [
    {
      icon: <ForumIcon color="primary" />,
      text: 'Chat',
    },
    {
      icon: <EventNoteIcon color="primary" />,
      text: 'Schedule',
    },
    {
      icon: <DescriptionIcon color="primary" />,
      text: 'Invoice',
    },
    {
      icon: <GroupsIcon color="primary" />,
      text: 'Manage',
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        mt: 2,
      }}
    >
      <Stack
        spacing={2}
        direction="row"
        divider={
          <Divider
            variant="inset"
            orientation="vertical"
            flexItem
            sx={{ height: '25px', borderColor: 'primary.main' }}
          />
        }
      >
        {iconsWithText.map(item => {
          return (
            <StackedIconText
              key={item.text}
              icon={item.icon}
              text={item.text}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

export default FeatureIconRow;
