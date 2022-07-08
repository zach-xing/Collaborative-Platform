import { Tabs, Select, TabPane } from "@douyinfe/semi-ui";
import React from "react";

import styles from "./index.module.scss";

/**
 * workbench 中的页面中的 “反馈”组件
 */
const WorkbenchFeedback = () => {
  return (
    <Tabs
      type="line"
      tabBarExtraContent={
        <Select
          style={{ width: 200 }}
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
      <TabPane tab="审批反馈" itemKey="1">
        <h3>文档</h3>
        搜索
      </TabPane>
      <TabPane tab="汇报反馈" itemKey="2">
        <h3>快速起步</h3>
        sdf
      </TabPane>
    </Tabs>
  );
};

export default WorkbenchFeedback;
