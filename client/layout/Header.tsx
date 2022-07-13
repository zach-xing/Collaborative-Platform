import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Nav } from "@douyinfe/semi-ui";
import { IconSemiLogo, IconBell, IconHelpCircle } from "@douyinfe/semi-icons";
import useAuth from "../utils/auth";
import Login from "../components/Login";
import Register from "../components/Register";

const Header = () => {
  const { isLogin } = useAuth();
  const { route, push } = useRouter();
  const [loginVisible, setLoginVisible] = React.useState(false);
  const [registerVisible, setRegisterVisible] = React.useState(false);

  let renderComp;
  if (isLogin()) {
    if (route === "/") {
      // 已经登录情况下访问主页
      renderComp = (
        <>
          <Button
            theme="borderless"
            type="primary"
            onClick={() => push("/chat")}
            style={{ marginRight: 8 }}
          >
            进入空间
          </Button>
          <Avatar color="orange" size="small">
            YJ
          </Avatar>
        </>
      );
    } else {
      // 已经登录情况下进入空间
      renderComp = (
        <>
          <Button
            theme="borderless"
            icon={<IconBell size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
          <Button
            theme="borderless"
            icon={<IconHelpCircle size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
          />
          <Avatar color="orange" size="small">
            YJ
          </Avatar>
        </>
      );
    }
  } else {
    if (route === "/") {
      // 未登录的情况下访问主页
      renderComp = (
        <>
          <Button
            theme="borderless"
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => setRegisterVisible(true)}
          >
            注册
          </Button>
          <Button
            theme="borderless"
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => setLoginVisible(true)}
          >
            登录
          </Button>

          <Login visible={loginVisible} setVisible={setLoginVisible} />
          <Register visible={registerVisible} setVisible={setRegisterVisible} />
        </>
      );
    } else {
      /* 在未登录的情况下访问其他页面会被拦截做鉴权，会被重定向到首页 */
    }
  }

  return (
    <Nav mode="horizontal">
      <Nav.Header>
        <IconSemiLogo style={{ fontSize: 36 }} />
      </Nav.Header>

      <Nav.Footer>{renderComp}</Nav.Footer>
    </Nav>
  );
};

export default Header;
