import { Tabs, Select, TabPane, List } from "@douyinfe/semi-ui";
import React from "react";

import styles from "./index.module.scss";
import TabPaneComp from "./TabPaneComp";

// agree reject pending

/**
 * workbench 中的页面中的 “反馈”组件
 */
const WorkbenchFeedback = () => {
  return (
    <Tabs
      type="line"
      keepDOM={false}
      tabBarExtraContent={
        <Select
          style={{ width: 200 }}
          defaultValue={"all"}
          optionList={[
            { value: "all", label: "全部" },
            { value: "unfinished", label: "处理中" },
            { value: "finished", label: "已完成" },
          ]}
          placeholder="过滤规则"
          insetLabel={<span className={styles.tabInsetLabel}>过滤规则</span>}
        ></Select>
      }
    >
      <TabPane tab="请假反馈" itemKey="1">
        <TabPaneComp flag={"leave"} />
      </TabPane>
      <TabPane tab="加班反馈" itemKey="2">
        <TabPaneComp flag={"overtime"} />
      </TabPane>
      <TabPane tab="外出反馈" itemKey="3">
        <TabPaneComp flag={"outside"} />
      </TabPane>
    </Tabs>
  );
};

export default WorkbenchFeedback;
