import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarRoutes from "./SidebarRoutes";
import SidebarMenu from "./SidebarMenu";
import { useMediaQuery } from "@mui/material";
import headerBg from "../../../assets/Header-bg.svg";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#eee",
      }}
    >
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <SidebarMenu open={open} />
      </Drawer>
      <Box
        component="main"
        sx={{
          maxHeight: "21vh",
          backgroundColor: "#eee",
          flexGrow: 1,
          p: 0,
          backgroundImage: `url(${headerBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Box />
        <Box>
          <Box p={2} mt={1}>
            <SidebarRoutes />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
