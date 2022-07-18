import { IconMore } from "@douyinfe/semi-icons";
import { Table } from "@douyinfe/semi-ui";
import React from "react";
import { useFetchApprovalData } from "../../data/workbench";
import useLocalStorage from "../../hooks/use-localStorage";
import StateTag from "./components/StateTag";

/**
 * 审批中心 组件
 */
const ApprovalCenter = () => {
  const [user, _] = useLocalStorage("user", null);
  const { approvalData, isLoading } = useFetchApprovalData(user.id);

  if (isLoading) {
    return <>Loading...</>;
  }
  // const handleFilter = (value: any, record: any) => {
  //   console.log(value, record.id, value === record.state);
  //   return record.state.includes(value);
  // };

  return (
    <Table dataSource={approvalData} scroll={{ y: "400px" }}>
      <Table.Column title="名称" width="50%" dataIndex="title" key="title" />
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
        title="发送时间"
        width="20%"
        dataIndex="sendTime"
        key="sendTime"
      />
      <Table.Column
        title=""
        dataIndex="operate"
        key="operate"
        render={() => <IconMore />}
      />
    </Table>
  );
};

export default ApprovalCenter;
