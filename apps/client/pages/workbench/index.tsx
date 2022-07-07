import React from "react";
import { useRouter } from "next/router";
import { Row, Col, Nav, TabPane, Tabs } from "@douyinfe/semi-ui";

import styles from "./index.module.scss";

const Workbench = () => {
  const router = useRouter();

  return (
    <Tabs tabPosition="left" type="button">
      <TabPane tab="反馈" itemKey="1">
        <Tabs type="line">
          <TabPane tab="审批反馈" itemKey="1">
            <h3>文档</h3>
            搜索
          </TabPane>
          <TabPane tab="汇报反馈" itemKey="2">
            <h3>快速起步</h3>
            sdf
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane tab="审批" itemKey="2">
        <div style={{ padding: "0 24px" }}>
          <h3>快速起步</h3>
          <pre
            style={{
              margin: "24px 0",
              padding: "20px",
              border: "none",
              whiteSpace: "normal",
              borderRadius: "6px",
              color: "var(--semi-color-text-1)",
              backgroundColor: "var(--semi-color-fill-0)",
            }}
          >
            <code>yarn add @douyinfe/semi-ui</code>
          </pre>
        </div>
      </TabPane>
      <TabPane tab="汇报" itemKey="3">
        <div style={{ padding: "0 24px" }}>
          <h3>帮助</h3>
          <p
            style={{
              lineHeight: 1.8,
              color: "var(--semi-color-text-0)",
              fontWeight: 600,
            }}
          >
            Q：有新组件需求、或者现有组件feature不能满足业务需求？
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
            右上角问题反馈，提交issue，label选择Feature Request / New Component
            Request 我们会高优处理这些需求。
          </p>
          <p
            style={{
              lineHeight: 1.8,
              color: "var(--semi-color-text-0)",
              fontWeight: 600,
            }}
          >
            Q：对组件的使用有疑惑？
          </p>
          <p style={{ lineHeight: 1.8, color: "var(--semi-color-text-1)" }}>
            欢迎进我们的客服lark群进行咨询提问。
          </p>
        </div>
      </TabPane>
    </Tabs>
  );
};

export default Workbench;
