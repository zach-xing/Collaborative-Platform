import { IconSendStroked } from "@douyinfe/semi-icons";
import { Row, Col, Card, Button, Modal } from "@douyinfe/semi-ui";
import React from "react";
import SendReportForm from "./components/SendReportForm";

/**
 * 发送汇报 组件
 */
const SendReport = () => {
  const [visible, setVisible] = React.useState(false);
  const [flag, setFlag] = React.useState<0 | 1 | 2>(0);

  const handleOpenModal = (flag: 0 | 1 | 2) => {
    setFlag(flag);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title="日报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightblue" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => handleOpenModal(0)}
              />
            }
          >
            汇报日报
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="周报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightyellow" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => handleOpenModal(1)}
              />
            }
          >
            汇报周报
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="月报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightsalmon" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => handleOpenModal(2)}
              />
            }
          >
            汇报月报
          </Card>
        </Col>
      </Row>

      <Modal
        title="汇报"
        fullScreen
        visible={visible}
        onCancel={onClose}
        bodyStyle={{ display: "flex", justifyContent: "center" }}
        footer={null}
      >
        <SendReportForm flag={flag} />
      </Modal>
    </>
  );
};

export default SendReport;
