import { IconSendStroked } from "@douyinfe/semi-icons";
import { Row, Col, Card, Button, Modal } from "@douyinfe/semi-ui";
import React from "react";

/**
 * 发送汇报 组件
 */
const SendReport = () => {
  const [visible, setVisible] = React.useState(false);
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card
            title="日报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightblue" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            汇报日报
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="周报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightyellow" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            汇报周报
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="月报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightsalmon" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            汇报月报
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="自由汇报"
            headerLine={false}
            headerStyle={{ backgroundColor: "lightgreen" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            自由汇报
          </Card>
        </Col>
      </Row>

      <Modal
        title="全屏对话框标题"
        fullScreen
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <p>This is a full screen modal</p>
        <p>More content...</p>
      </Modal>
    </>
  );
};

export default SendReport;
