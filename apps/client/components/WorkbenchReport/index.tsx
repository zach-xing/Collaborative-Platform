import { Tabs, TabPane } from "@douyinfe/semi-ui";
import React from "react";
import CheckInfo from "./CheckInfo";
import SendReport from "./SendReport";

/**
 * workbench 中的页面中的 汇报组件
 */
const WorkbenchReport = () => {
  return (
    <Tabs type="line" keepDOM={false}>
      <TabPane tab="填写汇报" itemKey="1">
        <SendReport />
      </TabPane>
      <TabPane tab="查看信息" itemKey="2">
        <CheckInfo />
      </TabPane>
    </Tabs>
  );
};

export default WorkbenchReport;
