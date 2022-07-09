import { IconMore } from "@douyinfe/semi-icons";
import { Table } from "@douyinfe/semi-ui";
import React from "react";
import StateTag from "./components/StateTag";

const data: any = [
  {
    id: "1",
    title: "123请假请请假",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "2",
    title: "123",
    state: "reject",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "3",
    title: "123",
    state: "pending",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "4",
    title: "123",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "5",
    title: "123",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "6",
    title: "123",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "7",
    title: "123",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
  {
    id: "8",
    title: "123",
    state: "agree",
    time: "2022.7.7",
    desc: "Editor.js is a block-style editor for rich media stories. It outputs clean data in JSON instead of heavy HTML markup. And more important thing is that Editor.js is designed to be API extendable and pluggable.",
  },
];

/**
 * 审批中心 组件
 */
const ApprovalCenter = () => {
  // const handleFilter = (value: any, record: any) => {
  //   console.log(value, record.id, value === record.state);
  //   return record.state.includes(value);
  // };

  return (
    <Table dataSource={data} scroll={{ y: "400px" }}>
      <Table.Column title="名称" width="50%" dataIndex="id" key="title" />
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
      <Table.Column title="发送时间" width="20%" dataIndex="time" key="time" />
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
