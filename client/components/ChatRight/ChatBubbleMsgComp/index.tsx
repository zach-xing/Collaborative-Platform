import { Avatar, Popover } from "@douyinfe/semi-ui";
import React from "react";
import { useFetchChatList } from "../../../data/chat";
import io from "socket.io-client";

import styles from "./index.module.scss";

/**
 * 展示消息气泡的列表
 */
const ChatMsgBubbleList: React.FC<{ id: string }> = (props) => {
  const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));
  const { chatMsgList, isLoading } = useFetchChatList(props.id);

  React.useEffect(() => {
    ioRef.current.on("message", (value: any) => {
      console.log("来自服务器的数据：", value);
    });
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {chatMsgList?.map((item, idx) => (
        <div
          key={item.id}
          style={{ display: "flex", alignItems: "center", margin: "20px 10px" }}
        >
          <Avatar alt={item.name}>{item.name}</Avatar>
          <Popover
            position={"right"}
            content={<div style={{ padding: 5 }}>{item.sendTime}</div>}
          >
            <div className={styles.msg}>{item.lineText}</div>
          </Popover>
        </div>
      ))}
    </>
  );
};

export default ChatMsgBubbleList;
