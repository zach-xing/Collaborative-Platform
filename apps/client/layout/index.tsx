import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

/**
 * 布局作用
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      <Sidebar />
      <Box
        sx={{
          position: "absolute",
          top: 64,
          left: 64,
          right: 0,
          bottom: 0,
          p: 2,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default Layout;
