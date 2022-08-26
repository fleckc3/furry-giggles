import {
  Box,
  Drawer,
  Divider,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

const drawerWidth = 240;

function DesktopSideDrawer({ isOpen, close }) {
  const drawerItems = [
    {
      id: "1",
      value: "Home",
    },
    {
      id: "2",
      value: "Profile",
    },
    {
      id: "3",
      value: "Messages",
    },
  ];

  return (
    <Hidden smDown>
      <Drawer
        open={isOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: "flex-end",
          })}
        >
          <IconButton onClick={close}>
            <ChevronLeft />
          </IconButton>
        </Box>
        <Divider variant="middle" />
        <List>
          {drawerItems.map((item) => (
            <ListItem button key={item.id}>
              <ListItemText primary={item.value} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Hidden>
  );
}

export default DesktopSideDrawer;
