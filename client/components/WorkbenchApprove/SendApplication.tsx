import React from "react";
import {
  IconClock,
  IconDesktop,
  IconExit,
  IconSendStroked,
} from "@douyinfe/semi-icons";
import { Button, Card, Col, Modal, Row, Typography } from "@douyinfe/semi-ui";
import SendApplyForm from "./components/SendApplyForm";

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
  const [flag, setFlag] = React.useState<"1" | "2" | "3">("1"); // 1表示请假、2表示加班、3表示外出

  const handleOpenModal = (num: "1" | "2" | "3") => {
    setVisible(true);
    setFlag(num);
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
                onClick={() => handleOpenModal("1")}
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
                onClick={() => handleOpenModal("2")}
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
                onClick={() => handleOpenModal("3")}
              />
            }
          >
            外出申请
          </Card>
        </Col>
      </Row>

      <Modal
        title={
          <>{flag === "1" ? "请假" : flag === "2" ? "加班" : "外出"}</>
        }
        fullScreen
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
        bodyStyle={{ display: "flex", justifyContent: "center" }}
      >
        <SendApplyForm flag={flag} />
      </Modal>
    </>
  );
};

export default SendApplication;
