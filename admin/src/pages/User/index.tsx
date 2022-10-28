import { Button, Space, Table } from "antd";
import React from "react";
import { useFetchUser } from "../../data/user";

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
}

const User = () => {
  const { userList, isLoading } = useFetchUser();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <Table dataSource={userList}>
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
