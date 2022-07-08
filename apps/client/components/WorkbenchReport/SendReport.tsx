import { Row, Col, Card } from "@douyinfe/semi-ui";
import React from "react";

/**
 * 发送汇报 组件
 */
const SendReport = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={6}>
        <Card
          title="日报"
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightblue" }}
        >
          汇报日报
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="周报"
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightyellow" }}
        >
          汇报周报
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="月报"
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightsalmon" }}
        >
          汇报月报
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="自由汇报"
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightgreen" }}
        >
          自由汇报
        </Card>
      </Col>
    </Row>
  );
};

export default SendReport;
