import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarRoutes from "./SidebarRoutes";
import SidebarMenu from "./SidebarMenu";
import headerBg from "../../../assets/Header-bg.svg";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../app/slices/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from "../../../assets/LogoutMobile.svg";
import backIcon from "../../../assets/back arrow.svg";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
        backgroundColor: "#eee",
        overflow: "hidden",
        overflowY: "auto",
        height: "100vh",
        position: "relative",
      }}
    >
      <CssBaseline />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#eee",
          backgroundImage: `url(${headerBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          maxHeight: "10vh",
          paddingBottom: "70px",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 8888,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0px 0 15px",
            marginTop: "-13px",
          }}
        >
          <img
            src={backIcon}
            alt="back icon"
            style={{
              marginLeft: "10px",
              marginRight: "-120px",
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          />
          <span
            style={{
              color: "white",
              fontSize: "22px",
            }}
          >
            {location?.pathname === "/secured/blogs"
              ? "Blog Listing"
              : location?.pathname === "/secured/blogs/add-blog"
              ? "Create Blog"
              : "Update Blog"}
          </span>
          <IconButton
            onClick={handleLogout}
            sx={{
              marginTop: 1.3,
              paddingBottom: 0,
              paddingRight: 2,
              minHeight: "48px",
              marginBottom: "20px",
            }}
          >
            <img src={LogoutIcon} alt="logout icon" />
          </IconButton>
        </Box>
        <Box />
      </Box>

      <Box maxWidth={"100vw"}>
        <Box p={2}>
          <SidebarRoutes />
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 9999,
          backgroundColor: "#fff",
          boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <SidebarMenu />
      </Box>
    </Box>
  );
};

export default Sidebar;
