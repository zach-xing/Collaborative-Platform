import { Button, Card, Empty, Form, Space, Upload } from "@douyinfe/semi-ui";
import React from "react";
import io from "socket.io-client";
import { CHAT_WITH_USER, event } from "../../events";
import ChatMsgBubbleList from "./ChatMsgBubbleList";
import ScrollBox from "../ScrollBox";
import useLocalStorage from "../../hooks/use-localStorage";

import styles from "./index.module.scss";
import { IconUpload } from "@douyinfe/semi-icons";
import { sendImgToOSS } from "../../data/ali-oss";

/**
 * chat 页面的 右部分
 */
const ChatRight = () => {
  const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));
  const [user, _] = useLocalStorage("user", {} as any);
  const [curChatRoom, setCurChatRoom] = React.useState<{
    chatRoomName: string;
    chatRoomId: string;
  } | null>(null);

  // 处理自定义 evnet
  React.useEffect(() => {
    const handle = (val: any) => {
      setCurChatRoom(val);
    };
    event.on(CHAT_WITH_USER, handle);
    return () => {
      event.off(CHAT_WITH_USER, handle);
    };
  }, []);

  // 发送聊天信息
  const handleSendChat = (val: any) => {
    ioRef.current.emit("sendChat", {
      chatRoomId: curChatRoom?.chatRoomId,
      chat_line: val.chat_line,
      userId: user.id,
      userName: user.name,
      type: "text",
    });
  };

  // 发送图片时的处理
  const handleUpload = async ({ file, onError, onSuccess }: any) => {
    const data = await sendImgToOSS(file.name, file.fileInstance.slice());
    console.log(data);
    ioRef.current.emit("sendChat", {
      chatRoomId: curChatRoom?.chatRoomId,
      chat_line: data?.url,
      userId: user.id,
      userName: user.name,
      type: "image",
    });
  };

  return (
    <>
      {curChatRoom !== null ? (
        <Card
          title={curChatRoom.chatRoomName}
          style={{ width: "100%", height: "100%" }}
          bodyStyle={{
            display: "flex",
            flexDirection: "column",
            height: "calc(100% - 94px)",
          }}
          headerExtraContent={<div>更多</div>}
        >
          <ScrollBox flex={7}>
            <ChatMsgBubbleList
              chatRoomId={curChatRoom.chatRoomId}
              socket={ioRef.current}
            />
          </ScrollBox>

          <Form style={{ flex: 2 }} onSubmit={handleSendChat}>
            <Form.Input
              noLabel
              field="chat_line"
              size="large"
              maxLength={100}
            />
            <Space>
              <Button type="primary" htmlType="submit">
                发送
              </Button>
              <Upload
                action=""
                accept="image/*"
                showUploadList={false}
                customRequest={handleUpload}
              >
                <Button icon={<IconUpload />} theme="light">
                  上传图片
                </Button>
              </Upload>
            </Space>
          </Form>
        </Card>
      ) : (
        <Empty title={"欢迎使用"} description="点击左边用户名即可开始聊天" />
      )}
    </>
  );
};

export default ChatRight;
