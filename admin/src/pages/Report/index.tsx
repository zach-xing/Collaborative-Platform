import { Button, Descriptions, Modal, Space, Table, Tag } from "antd";
import React from "react";
import { useFetchReport } from "../../data/report";

const { Column } = Table;

interface DataType {
  key: React.Key;
  id: string;
  type: string;
  curReport: string;
  prevReport: string;
  otherReport: string;
  sendTime: string;
  title: string;
  name: string;
}

const Report = () => {
  const { list, isLoading } = useFetchReport();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [curData, setCurData] = React.useState<DataType>();

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleOpen = (data: any) => {
    setIsModalOpen(true);
    console.log(data);
    setCurData(data);
  };

  return (
    <>
      <Table dataSource={list}>
        <Column title="Id" dataIndex="id" key="id" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column title="标题" dataIndex="title" key="title" />
        <Column
          title="类型"
          dataIndex="type"
          key="type"
          render={(state: string) => (
            <Tag color="blue" key={state}>
              {state === "0" ? "日报" : state === "1" ? "周报" : "月报"}
            </Tag>
          )}
        />

        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button onClick={() => handleOpen(record)}>查看</Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="查看"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        width={1000}
        footer={null}
      >
        <Descriptions title="" bordered>
          <Descriptions.Item label="发布时间">
            {curData?.sendTime}
          </Descriptions.Item>
          <Descriptions.Item label="当天/周/月">
            {curData?.curReport}
          </Descriptions.Item>
          <Descriptions.Item label="明天/下周/下月">
            {curData?.prevReport}
          </Descriptions.Item>
          <Descriptions.Item label="其他">
            {curData?.otherReport}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default Report;
