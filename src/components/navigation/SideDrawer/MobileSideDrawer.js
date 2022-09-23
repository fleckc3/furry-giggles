import {
  Hidden,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

function MobileSideDrawer({ open, onOpen, onClose }) {
  const drawerItems = [
    {
      id: '1',
      value: 'Home',
    },
    {
      id: '2',
      value: 'Profile',
    },
    {
      id: '3',
      value: 'Messages',
    },
  ];

  return (
    <Hidden smUp>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={onOpen}
        onClose={onClose}
      >
        <List>
          {drawerItems.map(item => (
            <ListItem button key={item.id}>
              <ListItemText primary={item.value} />
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </Hidden>
  );
}

export default MobileSideDrawer;
