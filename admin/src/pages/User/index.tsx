import { Button, Space, Table } from "antd";
import React from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
}

const data: DataType[] = [
  {
    key: "1",
    id: "1",
    name: "John",
    email: "john@gmail.com",
  },
  {
    key: "2",
    id: "2",
    name: "sdfsdf",
    email: "sdfsdf@gmail.com",
  },
  {
    key: "3",
    id: "3",
    name: "qqqqqqq",
    email: "qqqqqqq@gmail.com",
  },
];

const User = () => {
  return (
    <>
      <Table dataSource={data}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="邮件" dataIndex="email" key="email" />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button danger>删除</Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default User;
