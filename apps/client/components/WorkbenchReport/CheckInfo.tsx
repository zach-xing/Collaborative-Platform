import { List, Typography } from "@douyinfe/semi-ui";
import React from "react";

const data: any = [
  {
    id: "1",
    label: "标题111",
    time: "2022.7.7",
  },
  {
    id: "2",
    label: "123",
    time: "2022.7.7",
  },
];

/**
 * 查看信息 组件
 */
const CheckInfo = () => {
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
              <div style={{ marginLeft: "10px" }}>
                <Typography.Title heading={6}>
                  {item.time} -{item.label}
                </Typography.Title>
                <Typography.Text type="tertiary">
                  发布于 - {item.time}
                </Typography.Text>
              </div>
            </div>
          }
        />
      )}
    />
  );
};

export default CheckInfo;
