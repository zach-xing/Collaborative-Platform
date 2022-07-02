import React from "react";
import { useRouter } from "next/router";
import {
  MdSpaceDashboard,
  MdEmojiPeople,
  MdOutlineNotifications,
} from "react-icons/md";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import useAuth from "../utils/auth";

/**
 * 导航信息
 */
const Header = () => {
  const { isLogin } = useAuth();
  const { route, push } = useRouter();

  let renderComp;

  if (isLogin()) {
    if (route === "/") {
      // 已经登录情况下访问主页
      renderComp = (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => push("/chat")}
          >
            进入空间
          </Button>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error">
              <MdEmojiPeople />
            </Badge>
          </IconButton>
        </Box>
      );
    } else {
      // 已经登录情况下进入空间
      renderComp = (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <MdOutlineNotifications />
            </Badge>
          </IconButton>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error">
              <MdEmojiPeople />
            </Badge>
          </IconButton>
        </Box>
      );
    }
  } else {
    if (route === "/") {
      // 未登录的情况下访问主页
      renderComp = (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button variant="text" color="secondary">
            注册
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => push("/login")}
          >
            登录
          </Button>
        </Box>
      );
    } else {
      /* 在未登录的情况下访问其他页面会被拦截做鉴权，会被重定向到首页 */
    }
  }

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MdSpaceDashboard />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {renderComp}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
