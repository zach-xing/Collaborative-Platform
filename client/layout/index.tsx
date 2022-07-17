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

  // if (router.route === "/") {
  //   return (
  //     <Layout style={{ height: "100%" }}>
  //       <Header>
  //         <HeaderBox />
  //       </Header>
  //       <Content>{children}</Content>
  //     </Layout>
  //   );
  // } else {
  //   // '/chat'、'/task' 等
  //   if (!isLogin()) {
  //     // 在需要鉴权的页面 and 未登录
  //     return <Redirect url="/" />;
  //   } else {
  //     // 在需要鉴权的页面 and 已登录
  //     return (

  //     );
  //   }
  // }
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
