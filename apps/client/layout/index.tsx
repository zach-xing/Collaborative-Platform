import React from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";

/**
 * 布局作用
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>还没想好</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navigation />
      <Sidebar />
      <Box sx={{ position: "absolute", top: 0, left: 360 }}>{children}</Box>
    </>
  );
};

export default Layout;
