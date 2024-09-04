import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Box, Paper, styled } from "@mui/material";
import { NavLink as NLink, useLocation } from "react-router-dom";
import routes from "../../../shared/routes/AdminRoutes";

const NavLink = styled(NLink)({
  textDecoration: "none",
});

const SidebarMenu = () => {
  const location = useLocation();
  return (
    <Paper
      sx={{
        backgroundColor: "white",
        borderTopLeftRadius: "40px",
        borderTopRightRadius: "40px",
        paddingTop: "15px",
        paddingBottom: "1px",
        marginTop: "-50px",
      }}
      elevation={5}
    >
      <List
        style={{
          color: "blue",
          display: "flex",
          padding: 0,
          margin: 0,
        }}
      >
        {Array.isArray(routes) &&
          routes
            .filter((route) => route.showInMenu)
            .map(({ path, label, icon, activeIcon }, index) => (
              <React.Fragment key={path + "-" + index}>
                <ListItem
                  disablePadding
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <NavLink
                    end
                    to={path}
                    style={({ isActive }) => ({
                      width: "100%",
                      color: isActive ? "#0d6efd" : "#000",
                      fontWeight: isActive ? "bold" : "normal",
                      textDecoration: "none",
                      borderRadius: "4px",
                      position: "relative",
                      transition: "color 0.3s",
                    })}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        maxWidth: 50,
                        display: "flex",
                        justifyContent: "center",
                        px: 2.5,
                        paddingBottom: "12px",
                        margin: "0 auto",
                        position: "relative",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          justifyContent: "center",
                          color: "inherit",
                          width: "30px",
                          height: "30px",
                          paddingBottom: "5px",
                        }}
                      >
                        {location.pathname === `/secured/${path}`
                          ? activeIcon
                          : path === "" && location.pathname === "/secured"
                          ? activeIcon
                          : icon}
                      </ListItemIcon>
                      {location.pathname === `/secured/${path}` && (
                        <Box
                          sx={{
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "100%",
                            height: "7px",
                            backgroundColor: "#4169E1",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
                      )}
                      {path === "" && location.pathname === "/secured" && (
                        <Box
                          sx={{
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "100%",
                            height: "7px",
                            backgroundColor: "#4169E1",
                            borderTopLeftRadius: "8px",
                            borderTopRightRadius: "8px",
                          }}
                        />
                      )}
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              </React.Fragment>
            ))}
      </List>
    </Paper>
  );
};

export default SidebarMenu;
