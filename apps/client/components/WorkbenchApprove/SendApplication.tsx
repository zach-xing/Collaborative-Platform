import React from "react";
import {
  IconClock,
  IconDesktop,
  IconExit,
  IconSendStroked,
} from "@douyinfe/semi-icons";
import { Button, Card, Col, Modal, Row, Typography } from "@douyinfe/semi-ui";

const HeadingComp = (props: { iconComp: React.ReactNode; text: string }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {props.iconComp}
      <Typography.Title heading={6} style={{ marginLeft: 5 }}>
        {props.text}
      </Typography.Title>
    </div>
  );
};

/**
 * 显示发送申请的组件
 */
const SendApplication = () => {
  const [visible, setVisible] = React.useState(false);
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card
            title={
              <HeadingComp
                iconComp={<IconClock size="extra-large" />}
                text={"请假"}
              />
            }
            headerLine={false}
            headerStyle={{ backgroundColor: "lightblue" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            请假申请
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <HeadingComp
                iconComp={<IconDesktop size="extra-large" />}
                text={"加班"}
              />
            }
            headerLine={false}
            headerStyle={{ backgroundColor: "lightyellow" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            加班申请
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title={
              <HeadingComp
                iconComp={<IconExit size="extra-large" />}
                text={"外出"}
              />
            }
            headerLine={false}
            headerStyle={{ backgroundColor: "lightgreen" }}
            headerExtraContent={
              <Button
                icon={<IconSendStroked />}
                onClick={() => setVisible(true)}
              />
            }
          >
            外出申请
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

export default SendApplication;
