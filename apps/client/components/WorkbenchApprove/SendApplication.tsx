import { IconClock, IconDesktop, IconExit } from "@douyinfe/semi-icons";
import { Card, Col, Row, Typography } from "@douyinfe/semi-ui";

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
  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card
          title={
            <HeadingComp
              iconComp={<IconClock size="extra-large" />}
              text={"请假"}
            />
          }
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightblue" }}
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
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightyellow" }}
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
          shadows="hover"
          headerLine={false}
          headerStyle={{ backgroundColor: "lightgreen" }}
        >
          外出申请
        </Card>
      </Col>
    </Row>
  );
};

export default SendApplication;
