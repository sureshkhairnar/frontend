import React from "react";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/system";
import MobileNavigation from "../mobile/FullLayout";

const theme = createTheme();

const FullLayout = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return <>{isMobile ? <MobileNavigation /> : <Sidebar />}</>;
};

export default FullLayout;
