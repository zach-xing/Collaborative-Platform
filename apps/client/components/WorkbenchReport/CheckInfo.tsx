import React from "react";
import { Button, Descriptions, Modal, Table } from "@douyinfe/semi-ui";

const data: any = [
  {
    id: "1",
    title: "标题111",
    sendTime: "2022.7.7",
  },
  {
    id: "2",
    title: "123",
    sendTime: "2022.7.7",
  },
];

/**
 * 查看信息 组件
 */
const CheckInfo = () => {
  const [visible, setVisible] = React.useState(false);

  const handleOpenModal = (id: string) => {
    // TODO:展示详情（汇报的情况）
    setVisible(true);
  };

  return (
    <>
      <Table dataSource={data} scroll={{ y: "400px" }}>
        <Table.Column title="名称" width="50%" dataIndex="id" key="title" />
        <Table.Column
          title="发送时间"
          width="30%"
          dataIndex="sendTime"
          key="sendTime"
        />
        <Table.Column
          title=""
          dataIndex="operate"
          key="operate"
          render={(value, record) => (
            <Button onClick={() => handleOpenModal(record.id)}>查看更多</Button>
          )}
        />
      </Table>

      <Modal
        title="基本对话框"
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        <Descriptions>
          <Descriptions.Item itemKey="名称">1,480,000</Descriptions.Item>
          <Descriptions.Item itemKey="发送时间">98%</Descriptions.Item>
          <Descriptions.Item itemKey="安全等级">3级</Descriptions.Item>
          <Descriptions.Item itemKey="垂类标签">电商</Descriptions.Item>
          <Descriptions.Item itemKey="认证状态">未认证</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default CheckInfo;
