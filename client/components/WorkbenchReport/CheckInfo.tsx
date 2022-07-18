import React from "react";
import { Button, Descriptions, Modal, Table } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import { useFetchReport } from "../../data/workbench";
import { IReport } from "../../types";
import useLocalStorage from "../../hooks/use-localStorage";

const titleObj = {
  day: ["今日总结", "明日计划"],
  week: ["本周总结", "下周计划"],
  month: ["本月总结", "下月计划"],
};

const typeText = {
  day: "日报",
  week: "周报",
  month: "月报",
};

/**
 * 查看信息 组件
 */
const CheckInfo = () => {
  const [user, _] = useLocalStorage("user", "");
  const { reportData, isLoading } = useFetchReport(user.id);
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
          title="类别"
          width="20%"
          dataIndex="type"
          key="type"
          render={(text: "day" | "week" | "month") => `${typeText[text]}`}
        />
        <Table.Column
          title="发送时间"
          width="20%"
          dataIndex="sendTime"
          key="sendTime"
          render={(text) => dayjs(text).format("YYYY-MM-DD")}
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
        title="详情"
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        footer={null}
      >
        <Descriptions>
          <Descriptions.Item itemKey="标题">
            {curReportData?.title}
          </Descriptions.Item>
          <Descriptions.Item itemKey="发送时间">
            {dayjs(curReportData?.sendTime).format("YYYY-MM-DD")}
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
