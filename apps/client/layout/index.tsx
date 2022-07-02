import React from "react";
import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import Redirect from "../pages/redirect";
import Header from "./Header";
import Sidebar from "./Sidebar";
import useAuth from "../utils/auth";

// 不需要鉴权的页面
const notAuthArr = ["/", "/login", "/register"];

/**
 * 布局作用
 */
const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLogin } = useAuth();

  if (notAuthArr.indexOf(router.route) !== -1) {
    return (
      <>
        {router.route === "/" && <Header />}
        <Container>{children}</Container>
      </>
    );
  } else {
    // '/chat'、'/task' 等
    if (!isLogin()) {
      // 在需要鉴权的页面 and 未登录
      return <Redirect url="/login" />;
    } else {
      // 在需要鉴权的页面 and 已登录
      return (
        <>
          <Header />
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
    }
  }
};

export default Layout;
