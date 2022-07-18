import { IconDelete } from "@douyinfe/semi-icons";
import { Button, Descriptions, Modal, Space, Table } from "@douyinfe/semi-ui";
import React from "react";
import dayjs from "dayjs";
import { useFetchApprovalData } from "../../data/workbench";
import useLocalStorage from "../../hooks/use-localStorage";
import StateTag from "./components/StateTag";
import { typeArr } from "./constant";
import { IApproval } from "../../types";

/**
 * 审批中心 组件
 */
const ApprovalCenter = () => {
  const [user, _] = useLocalStorage("user", null);
  const { approvalData, isLoading } = useFetchApprovalData(user.id);
  const [visible, setVisible] = React.useState(false);
  const [curApproval, setCurApproval] = React.useState<
    IApproval & { title: string }
  >();

  if (isLoading) {
    return <>Loading...</>;
  }

  const handleCurApproval = (record: any) => {
    let title;
    if (record.type === "-1") {
      title = "加班";
    } else if (record.type === "0") {
      title = "外出";
    } else {
      title = typeArr[+record.type - 1].label;
    }
    setCurApproval({ ...record, title: title });
    setVisible(true);
  };

  // const handleFilter = (value: any, record: any) => {
  //   console.log(value, record.id, value === record.state);
  //   return record.state.includes(value);
  // };

  return (
    <>
      <Table dataSource={approvalData} scroll={{ y: "400px" }}>
        <Table.Column
          title="类型"
          dataIndex="type"
          width="30%"
          key="type"
          render={(text) =>
            text === "-1"
              ? "加班"
              : text === "0"
              ? "外出"
              : `请假（${typeArr[text].label}）`
          }
        />
        <Table.Column
          title="状态"
          dataIndex="state"
          width="10%"
          key="state"
          // filters={[
          //   { text: "通过", value: "agree" },
          //   { text: "未通过", value: "reject" },
          //   { text: "待处理", value: "pending" },
          // ]}
          // onFilter={handleFilter}
          render={(_, record) => <StateTag state={record.state} />}
        />
        <Table.Column
          title="开始时间"
          width="20%"
          dataIndex="startTime"
          key="startTime"
          render={(text) => `${dayjs(text).format("YYYY-MM-DD")}`}
        />
        <Table.Column
          title="结束时间"
          width="20%"
          dataIndex="endTime"
          key="endTime"
          render={(text) => `${dayjs(text).format("YYYY-MM-DD")}`}
        />
        <Table.Column
          title=""
          dataIndex="operate"
          key="operate"
          render={(_, record) => (
            <Space>
              <Button onClick={() => handleCurApproval(record)}>
                查看详情
              </Button>
              <Button
                icon={<IconDelete style={{ color: "red" }} />}
                disabled={record.state === "pending"}
              />
            </Space>
          )}
        />
      </Table>

      <Modal
        title="基本对话框"
        visible={visible && !!curApproval}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        footer={null}
      >
        <Descriptions>
          <Descriptions.Item itemKey="类型">
            {curApproval?.title}
          </Descriptions.Item>
          <Descriptions.Item itemKey="开始时间">
            {curApproval?.startTime}
          </Descriptions.Item>
          <Descriptions.Item itemKey="结束时间">
            {curApproval?.endTime}
          </Descriptions.Item>
          <Descriptions.Item itemKey="原因">
            {curApproval?.reason}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ApprovalCenter;
