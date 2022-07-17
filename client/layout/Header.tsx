import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Nav } from "@douyinfe/semi-ui";
import { IconSemiLogo, IconBell, IconHelpCircle } from "@douyinfe/semi-icons";
import { isLogin } from "../utils/auth";
import Login from "../components/Login";
import Register from "../components/Register";

const Header = () => {
  const router = useRouter();
  // 1 表示在首页时登录状态、2表示不在首页时登录状态、3表示未登录
  const [renderEl, setRenderEl] = React.useState<1 | 2 | 3>(1);
  const [loginVisible, setLoginVisible] = React.useState(false);
  const [registerVisible, setRegisterVisible] = React.useState(false);

  React.useEffect(() => {
    if (isLogin()) {
      if (router.route === "/") {
        setRenderEl(1);
      } else {
        setRenderEl(2);
      }
    } else {
      setRenderEl(3);
    }
  }, [router.route]);

  return (
    <>
      <Nav mode="horizontal">
        <Nav.Header>
          <IconSemiLogo style={{ fontSize: 36 }} />
        </Nav.Header>

        <Nav.Footer>
          {renderEl === 1 ? (
            <>
              <Button
                theme="borderless"
                type="primary"
                onClick={() => router.push("/chat")}
                style={{ marginRight: 8 }}
              >
                进入空间
              </Button>{" "}
              <Avatar color="orange" size="small">
                YJ
              </Avatar>
            </>
          ) : renderEl === 2 ? (
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
          ) : (
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
            </>
          )}
        </Nav.Footer>
      </Nav>

      <Login visible={loginVisible} setVisible={setLoginVisible} />
      <Register visible={registerVisible} setVisible={setRegisterVisible} />
    </>
  );
};

export default Header;
