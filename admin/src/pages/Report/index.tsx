import { Button, Space, Table, Tag } from "antd";
import React from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  type: "week" | "day" | "month";
  curReport: string;
  prevReport: string;
  otherReport: string;
  sendTime: string;
  title: string;
  name: string;
}

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    name: "John",
    curReport: "sdf",
    prevReport: "sdfsdfsdfsd",
    otherReport: "sfdsdf",
    sendTime: "2022-10-24",
    title: "123123",
    type: "day",
  },
  {
    key: "2",
    id: "2",
    name: "sdfsdf",
    curReport: "sdf",
    prevReport: "sdfsdfsdfsd",
    otherReport: "sfdsdf",
    sendTime: "2022-10-24",
    title: "123123",
    type: "week",
  },
  {
    key: "3",
    id: "3",
    name: "qqqqqqq",
    curReport: "sdf",
    prevReport: "sdfsdfsdfsd",
    otherReport: "sfdsdf",
    sendTime: "2022-10-24",
    title: "123123",
    type: "month",
  },
];

const Report = () => {
  return (
    <>
      <Table dataSource={data}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="标题" dataIndex="title" key="title" />
        <Column
          title="类型"
          dataIndex="type"
          key="type"
          render={(state: string) => (
            <Tag color="blue" key={state}>
              {state === "day" ? "日报" : state === "week" ? "周报" : "月报"}
            </Tag>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button>查看</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Report;
