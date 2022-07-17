import React from "react";
import { useRouter } from "next/router";
import { Layout } from "@douyinfe/semi-ui";
import Redirect from "../pages/redirect";
import HeaderBox from "./Header";
import SiderBox from "./Sidebar";
import { isLogin } from "../utils/auth";

const LayoutComp = ({ children }: { children: React.ReactNode }) => {
  const { Header, Sider, Content } = Layout;
  const router = useRouter();

  React.useEffect(() => {
    if (!isLogin()) {
      router.replace("/");
    }
  }, [router, router.route]);

  return (
    <Layout style={{ height: "100%" }}>
      <Header>
        <HeaderBox />
      </Header>
      <Layout style={{ height: "calc(100vh - 60px)" }}>
        {router.route !== "/" && (
          <Sider>
            <SiderBox />
          </Sider>
        )}
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
