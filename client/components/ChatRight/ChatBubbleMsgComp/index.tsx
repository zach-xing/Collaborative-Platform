import { Avatar, Popover } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../../../hooks/use-localStorage";
import { IChatLine, IUser } from "../../../types";

import styles from "./index.module.scss";

/**
 * 展示消息气泡的列表
 */
const ChatMsgBubbleList = (props: { chatRoomId: string; socket: any }) => {
  const [user, _] = useLocalStorage<IUser>("user", {} as any);
  // const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));
  const [chatLineList, setChatLineList] = React.useState<Array<IChatLine>>([]);

  React.useEffect(() => {
    handleFetch();
    props.socket.on("recvChat", handleRecvChat);
    return () => {
      props.socket.off("recvChat", handleRecvChat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetch = () => {
    props.socket.emit("fetchChat", props.chatRoomId, (val: any) => {
      setChatLineList([...val]);
    });
  };

  // 接收到信息的操作
  const handleRecvChat = (val: IChatLine) => {
    if (props.chatRoomId === val.chatId) {
      const arr = [...chatLineList];
      arr.push(val);
      setChatLineList(arr);
    }
  };

  return (
    <>
      {chatLineList?.map((item, idx) => (
        <div
          key={item.id}
          style={{ display: "flex", alignItems: "center", margin: "20px 10px" }}
        >
          <Avatar alt={item.userName} className={styles.avatar}>
            {item.userName[0]}
          </Avatar>
          <div style={{ width: "100%" }}>
            {item.userName}
            <Popover
              position="right"
              content={
                <div style={{ padding: 5 }}>
                  {dayjs(item.sendTime).format("YYYY-MM-DD HH:mm:ss")}
                </div>
              }
            >
              {item.userId === user.id ? (
                <div className={styles.myMsg}>{item.line_text}</div>
              ) : (
                <div className={styles.msg}>{item.line_text}</div>
              )}
            </Popover>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatMsgBubbleList;
