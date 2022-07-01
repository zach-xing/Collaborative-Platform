import React from "react";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";

/**
 * 布局作用
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <>
      <Header />

      {router.route !== "/" ? (
        <>
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
      ) : (
        <Container>{children}</Container>
      )}
    </>
  );
};

export default Layout;
