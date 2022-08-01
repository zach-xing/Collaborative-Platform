import React from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Dropdown, Nav, Toast } from "@douyinfe/semi-ui";
import { IconSemiLogo } from "@douyinfe/semi-icons";
import { isLogin } from "../utils/auth";
import Login from "../components/Login";
import Register from "../components/Register";
import Bell from "../components/Bell";
import { useUser } from "../data/user";

const Header = () => {
  const router = useRouter();
  const { logout } = useUser();
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

  // 退出登录
  const handleLogout = () => {
    logout();
    router.replace("/");
    Toast.success("退出成功");
  };

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
              </Button>
              <Avatar color="orange" size="small">
                U
              </Avatar>
            </>
          ) : renderEl === 2 ? (
            <div>
              <Bell />
              <Dropdown
                trigger={"click"}
                position={"bottomRight"}
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={handleLogout}>
                      退出登录
                    </Dropdown.Item>
                  </Dropdown.Menu>
                }
              >
                <Avatar color="orange" size="small">
                  U
                </Avatar>
              </Dropdown>
            </div>
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
