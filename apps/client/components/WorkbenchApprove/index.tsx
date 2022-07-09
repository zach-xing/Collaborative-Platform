import { TabPane, Tabs } from "@douyinfe/semi-ui";
import React from "react";
import ApprovalCenter from "./ApprovalCenter";
import SendApplication from "./SendApplication";

/**
 * workbench 中的页面中的 审批组件
 */
const WorkbenchApprove = () => {
  return (
    <Tabs
      type="line"
      keepDOM={false}
      style={{ height: "100%" }}
      contentStyle={{ height: "100%" }}
    >
      <TabPane tab="发起申请" itemKey="1">
        <SendApplication />
      </TabPane>
      <TabPane tab="审批中心" itemKey="2">
        <ApprovalCenter />
      </TabPane>
    </Tabs>
  );
};

export default WorkbenchApprove;
