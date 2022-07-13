import React from "react";
import { Button, Descriptions, Modal, Table } from "@douyinfe/semi-ui";
import { useFetchReport } from "../../data/workbench";
import { IReport } from "../../types";

const titleObj = {
  day: ["今日总结", "明日计划"],
  week: ["本周总结", "下周计划"],
  month: ["本月总结", "下月计划"],
};

/**
 * 查看信息 组件
 */
const CheckInfo = () => {
  const { reportData, isLoading } = useFetchReport();
  const [visible, setVisible] = React.useState(false);
  const [curReportData, setCurReportData] = React.useState<IReport>();

  const handleOpenModal = (idx: number) => {
    // TODO:展示详情（汇报的情况）
    setCurReportData(reportData![idx]);
    setVisible(true);
  };

  return (
    <>
      <Table
        dataSource={reportData}
        scroll={{ y: "400px" }}
        loading={isLoading}
      >
        <Table.Column title="名称" width="50%" dataIndex="title" key="title" />
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
          render={(_, __, idx) => (
            <Button onClick={() => handleOpenModal(idx)}>查看更多</Button>
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
          <Descriptions.Item itemKey="标题">
            {curReportData?.title}
          </Descriptions.Item>
          <Descriptions.Item itemKey="发送时间">
            {curReportData?.sendTime}
          </Descriptions.Item>
          <Descriptions.Item
            itemKey={curReportData ? titleObj[curReportData.type][0] : "总结"}
          >
            {curReportData?.curReport}
          </Descriptions.Item>
          <Descriptions.Item
            itemKey={curReportData ? titleObj[curReportData.type][1] : "计划"}
          >
            {curReportData?.prevReport}
          </Descriptions.Item>
          <Descriptions.Item itemKey="其他">
            {curReportData?.otherReport}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default CheckInfo;
