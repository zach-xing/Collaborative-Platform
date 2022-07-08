import { List, Typography } from "@douyinfe/semi-ui";
import React from "react";
import StateTag from "./components/StateTag";

const data: any = [
  {
    id: "1",
    label: "123请假请请假",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "2",
    label: "123",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
];

interface IProps {
  flag: string;
}

/**
 * TabPaneComp 组件
 */
const TabPaneComp: React.FC<IProps> = (props) => {
  return (
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          main={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StateTag state={item.state} />
              <div style={{ marginLeft: "10px" }}>
                <Typography.Title heading={6}>
                  {item.time} -{item.label}
                </Typography.Title>
                <Typography.Text type="tertiary">{item.desc}</Typography.Text>
              </div>
            </div>
          }
        />
      )}
    />
  );
};

export default TabPaneComp;
