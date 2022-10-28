import { Button, Form, message, Modal, Radio, Space, Table, Tag } from "antd";
import React from "react";
import { updateApproval, useFetchApproval } from "../../data/approval";

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

const Approval = () => {
  const { list, isLoading, refetch } = useFetchApproval();
  const [curId, setCurId] = React.useState<string | undefined>();

  if (isLoading) {
    return <>Loading...</>;
  }

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await updateApproval(curId as string, values.state);
      refetch();
      setCurId(undefined);
      message.success("审批成功");
    } catch (error) {
      message.error("审批出错");
    }
  };

  return (
    <>
      <Table dataSource={list}>
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
              <Button onClick={() => setCurId(record.id)}>更改状态</Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title="审批"
        open={curId !== undefined}
        onCancel={() => setCurId(undefined)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="状态"
            name="state"
            rules={[{ required: true, message: "Please Select!" }]}
          >
            <Radio.Group>
              <Radio value="agree"> 同意 </Radio>
              <Radio value="reject"> 拒绝 </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Approval;
