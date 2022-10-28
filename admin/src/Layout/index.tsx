import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

const { Header, Content, Sider } = Layout;

interface IProps {
  children: React.ReactNode;
}

/**
 * 布局
 */
const LayoutComp: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const onClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };

  const logout = () => {
    navigate("/login");
    message.success("退出成功");
  };

  return (
    <Layout className={styles.root}>
      <Header className={styles.header}>
        <div>
          {/* <div className="logo" /> */}
          <div className={styles.title}>后台管理系统</div>
        </div>
        <div>
          <Button type="link" danger onClick={logout}>
            退出登录
          </Button>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            onClick={onClick}
            mode="inline"
            defaultSelectedKeys={["/"]}
            defaultOpenKeys={["/"]}
            style={{ height: "100%", borderRight: 0 }}
            items={[
              {
                key: "/",
                icon: <UserOutlined />,
                label: `用户管理`,
              },
              {
                key: "/approval",
                icon: <LaptopOutlined />,
                label: `审批管理`,
              },
              {
                key: "/report",
                icon: <NotificationOutlined />,
                label: `报告管理`,
              },
            ]}
          />
        </Sider>

        <Layout>
          <Content className={styles.content}>{props.children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
