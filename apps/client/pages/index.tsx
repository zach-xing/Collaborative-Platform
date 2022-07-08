import { Typography } from "@douyinfe/semi-ui";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title style={{ fontSize: "5rem" }}>
        团队协作与管理平台
      </Typography.Title>
      <div style={{ marginTop: "30px" }}>
        <Typography.Title style={{ fontSize: "2rem" }}>
          团队协作与管理平台
        </Typography.Title>
      </div>
    </div>
  );
};

export default Home;
