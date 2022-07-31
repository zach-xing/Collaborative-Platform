import { Avatar, Popover } from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../../../hooks/use-localStorage";
import { IChatLine, IUser } from "../../../types";
import ImageComp from "../ChatMsgType/Image";
import Text from "../ChatMsgType/Text";

import styles from "./index.module.scss";

/**
 * 展示消息气泡的列表
 */
const ChatMsgBubbleList = (props: { chatRoomId: string; socket: any }) => {
  const [user, _] = useLocalStorage<IUser>("user", {} as any);
  // const ioRef = React.useRef<any>(io("ws://127.0.0.1:8888", { path: "/chat" }));
  const [chatLineList, setChatLineList] = React.useState<Array<IChatLine>>([]);
  const toEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    handleFetch();
    props.socket.on("recvChat", handleRecvChat);
    return () => {
      props.socket.off("recvChat", handleRecvChat);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chatRoomId]);

  // 因为 useEffect 的返回值的执行时机是在下次渲染之前调用，达到 vue 中的 nextTick 的效果
  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      toEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    };
  });

  const handleFetch = () => {
    props.socket.emit(
      "fetchChat",
      { chatRoomId: props.chatRoomId },
      (val: any) => {
        console.log(props.chatRoomId, val);
        setChatLineList([...val]);
      }
    );
  };

  // 接收到信息的操作
  const handleRecvChat = (val: IChatLine) => {
    if (props.chatRoomId === val.chatId) {
      setChatLineList((prev) => [...prev, val]);
    }
  };

  return (
    <div ref={toEndRef}>
      {chatLineList?.map((item, idx) => (
        <div
          key={item.id}
          style={{ display: "flex", alignItems: "center", margin: "20px 10px" }}
        >
          <Avatar alt={item.userName} className={styles.avatar}>
            {item.userName[0]}
          </Avatar>
          <div style={{ width: "100%" }}>
            <div>
              <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                {item.userName}
              </span>
              {dayjs(item.sendTime).format("YYYY-MM-DD HH:mm")}
            </div>
            <div>
              {item.type === "text" ? (
                <Text isMe={item.userId === user.id} value={item.chat_line} />
              ) : (
                <ImageComp value={item.chat_line} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMsgBubbleList;
