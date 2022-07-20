import { Button, Card, Empty, Form } from "@douyinfe/semi-ui";
import React from "react";
import io from "socket.io-client";
import { CHAT_WITH_USER, event } from "../../events";
import ChatMsgBubbleList from "./ChatBubbleMsgComp";
import ScrollBox from "../ScrollBox";

import styles from "./index.module.scss";

/**
 * chat 页面的 右部分
 */
const ChatRight = () => {
  // const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));
  const [curChatRoom, setCurChatRoom] = React.useState<{
    chatRoomName: string;
    chatRoomId: string;
  } | null>(null);

  React.useEffect(() => {
    const handle = (val: any) => {
      console.log("sdf", val);
      setCurChatRoom(val);
    };
    event.on(CHAT_WITH_USER, handle);
    return () => {
      event.off(CHAT_WITH_USER, handle);
    };
  }, []);

  return (
    <>
      {curChatRoom !== null ? (
        <Card
          title={curChatRoom.chatRoomName}
          style={{ width: "100%", height: "100%" }}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 64px)",
          }}
          headerExtraContent={<div>更多</div>}
        >
          <ScrollBox flex={7}>
            <ChatMsgBubbleList chatRoomId={curChatRoom.chatRoomId} />
          </ScrollBox>

          <Form style={{ flex: 2 }}>
            <Form.Input noLabel field="value" size="large" maxLength={100} />
            <Button type="primary" htmlType="submit">
              发送
            </Button>
          </Form>
        </Card>
      ) : (
        <Empty title={"欢迎使用"} description="点击左边用户名即可开始聊天" />
      )}
    </>
  );
};

export default ChatRight;
