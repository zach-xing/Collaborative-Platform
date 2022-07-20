import { Avatar, Popover } from "@douyinfe/semi-ui";
import React from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../../../hooks/use-localStorage";
import { IChatMsgListItem, IUser } from "../../../types";

import styles from "./index.module.scss";

/**
 * 展示消息气泡的列表
 */
const ChatMsgBubbleList = (props: { chatRoomId: string }) => {
  const [user, _] = useLocalStorage<IUser>("user", {} as any);
  const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));
  const [chatMsgList, setChatMsgList] = React.useState<Array<IChatMsgListItem>>(
    []
  );

  React.useEffect(() => {
    handleFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetch = () => {
    ioRef.current.emit("fetchChat", props.chatRoomId, (val: any) => {
      console.log("fetchChat", val);
      setChatMsgList(val);
    });
  };

  return (
    <>
      {chatMsgList?.map((item, idx) => (
        <div
          key={item.id}
          style={{ display: "flex", alignItems: "center", margin: "20px 10px" }}
        >
          <Avatar alt={item.userName}>{item.userName[0]}</Avatar>
          <Popover
            position={"right"}
            content={<div style={{ padding: 5 }}>{item.sendTime}</div>}
          >
            <div className={styles.msg}>{item.line_text}</div>
          </Popover>
        </div>
      ))}
    </>
  );
};

export default ChatMsgBubbleList;
