import { Button, Card, Form } from "@douyinfe/semi-ui";
import React from "react";
import io from "socket.io-client";
import ChatMsgBubbleList from "./ChatBubbleMsgComp";
import ScrollBox from "../ScrollBox";

import styles from "./index.module.scss";

const ChatRight = () => {
  // const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));

  // React.useEffect(() => {
  //   ioRef.current.on("message", (value: any) => {
  //     console.log("来自服务器的数据：", value);
  //   });
  // }, []);

  return (
    <Card
      title="Semi Design"
      style={{ width: "100%", height: "100%" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 64px)",
      }}
      headerExtraContent={<div>更多</div>}
    >
      <ScrollBox flex={7}>
        <ChatMsgBubbleList id={"1"} />
      </ScrollBox>

      <Form style={{ flex: 2 }}>
        <Form.Input noLabel field="value" size="large" maxLength={100} />
        <Button type="primary" htmlType="submit">
          发送
        </Button>
      </Form>
    </Card>
  );
};

export default ChatRight;
