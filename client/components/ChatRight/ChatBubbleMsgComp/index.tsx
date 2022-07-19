import { Avatar, Popover } from "@douyinfe/semi-ui";
import React from "react";

import styles from "./index.module.scss";

/**
 * 展示消息气泡的列表
 */
const ChatMsgBubbleList: React.FC<{ id: string }> = (props) => {
  // const { chatMsgList, isLoading } = useFetchChatList(props.id);
  const chatMsgList: any[] = [];

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
