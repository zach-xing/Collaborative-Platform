import { Row, Col, Nav } from "@douyinfe/semi-ui";
import React from "react";

import styles from "./layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Row style={{ height: "100%" }}>
      <Col span={6} className={styles.colLeft}>
        <Nav style={{ height: "100%" }}>
          <Nav.Item itemKey={"feedback"} text={"反馈"} />
          <Nav.Sub itemKey={"user"} text="审批">
            <Nav.Item itemKey={"golder"} text={"请假"} />
            <Nav.Item itemKey={"ban"} text={"加班"} />
          </Nav.Sub>
          <Nav.Sub itemKey={"union-management"} text="汇报">
            <Nav.Item itemKey={"notice"} text={"日报"} />
            <Nav.Item itemKey={"query"} text={"周报"} />
            <Nav.Item itemKey={"info"} text={"月报"} />
          </Nav.Sub>
        </Nav>
      </Col>
      <Col span={18} className={styles.colRight}>
        {children}
      </Col>
    </Row>
  );
};

export default Layout;
