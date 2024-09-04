import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Divider, IconButton, styled } from "@mui/material";
import { NavLink as NLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../app/slices/AuthSlice";

import routes from "../../../shared/routes/AdminRoutes";
import LogoutIcon from "../../../assets/Logout.svg";
import logo from "../../../assets/Logo.svg";

const NavLink = styled(NLink)({
  textDecoration: "none",
});

const SidebarMenu = ({ open }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("location.pathname", location?.pathname);

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          component="img"
          src={logo}
          alt="SVG logo"
          sx={{
            width: open ? "150px" : "50px",
            margin: "20px auto",
          }}
          display={open ? "block" : "none"}
        />

        <List
          style={{ color: "blue" }}
          sx={{
            marginTop: open ? "10vh" : "33vh",
          }}
        >
          {Array.isArray(routes) &&
            routes
              .filter((route) => route.showInMenu)
              .map(({ path, label, icon, activeIcon }, index) => (
                <React.Fragment key={path + "-" + index}>
                  <ListItem disablePadding sx={{ display: "block" }}>
                    <NavLink
                      end
                      to={path}
                      style={({ isActive }) => ({
                        width: "100%",
                        color: isActive ? "#0d6efd" : "#000",
                        fontWeight: isActive ? "bold" : "normal",
                        textDecoration: "none",
                        borderRadius: "4px",
                        transition: "background-color 0.3s, color 0.3s",
                      })}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? "initial" : "center",
                          px: 2.5,
                          marginTop: `${index === 1 ? "15px" : ""}`,
                          paddingLeft: `${
                            location.pathname === `/secured/${path}`
                              ? "15px"
                              : path === "" && location.pathname === "/secured"
                              ? "15px"
                              : "20px"
                          }`,
                          borderLeft: `${
                            location.pathname === `/secured/${path}`
                              ? "5px solid #4169E1"
                              : path === "" && location.pathname === "/secured"
                              ? "5px solid #4169E1"
                              : ""
                          }`,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                            color: "inherit",
                          }}
                        >
                          {location.pathname === `/secured/${path}`
                            ? activeIcon
                            : path === "" && location.pathname === "/secured"
                            ? activeIcon
                            : icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={label}
                          sx={{ opacity: open ? 1 : 0 }}
                        />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                </React.Fragment>
              ))}
        </List>
      </Box>
      <IconButton
        onClick={handleLogout}
        sx={{
          paddingTop: 0,
          paddingBottom: 0,
          minHeight: "48px",
          marginBottom: "20px",
        }}
      >
        <img src={LogoutIcon} alt="logout icon" />
      </IconButton>
    </Box>
  );
};

export default SidebarMenu;
