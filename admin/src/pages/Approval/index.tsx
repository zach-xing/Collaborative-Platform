import { Button, Space, Table, Tag } from "antd";
import React from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  state: "agree" | "reject" | "pending";
  startTime: string;
  endTime: string;
  reason: string;
  name: string;
}

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    name: "John",
    startTime: "2022-10-22",
    endTime: "2022-10-23",
    reason: "sdf",
    state: "agree",
  },
  {
    key: "2",
    id: "2",
    name: "sdfsdf",
    startTime: "2022-10-22",
    endTime: "2022-10-23",
    reason: "sdf",
    state: "reject",
  },
  {
    key: "3",
    id: "3",
    name: "qqqqqqq",
    startTime: "2022-10-22",
    endTime: "2022-10-23",
    reason: "sdf",
    state: "pending",
  },
];

const Approval = () => {
  return (
    <>
      <Table dataSource={data}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="开始时间" dataIndex="startTime" key="startTime" />
        <Column title="结束时间" dataIndex="endTime" key="endTime" />
        <Column title="原因" dataIndex="reason" key="reason" />
        <Column
          title="状态"
          dataIndex="state"
          key="state"
          render={(state: string) => (
            <Tag
              color={
                state === "agree"
                  ? "green"
                  : state === "reject"
                  ? "red"
                  : "blue"
              }
              key={state}
            >
              {state === "agree"
                ? "同意"
                : state === "reject"
                ? "拒绝"
                : "待定"}
            </Tag>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button>更改</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Approval;
