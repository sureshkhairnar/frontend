import React from "react";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/PowerSettingsNew";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../app/slices/AuthSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(removeUser());
    navigate("/");
  };

  return (
    <>
      <MenuItem onClick={handleLogout}>
        <IconButton sx={{ PaddingTop: 0, paddingBottom: 0 }}>
          <LogoutIcon />
        </IconButton>
        Logout
      </MenuItem>
    </>
  );
};

export default Logout;
