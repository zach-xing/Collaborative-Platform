import React from "react";
import { Avatar, Button, List } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import { CHAT_WITH_USER, event } from "../../events";
import ScrollBox from "../ScrollBox";
import MoreOptions from "./components/MoreOptions";
import { useFetchChatUserList } from "../../data/chatroom";
import useLocalStorage from "../../hooks/use-localStorage";
import { IUser } from "../../types";

import styles from "./index.module.scss";

/**
 * Chat 页面的左部分
 */
const ChatLeft = () => {
  const [user, _] = useLocalStorage<IUser>("user", {} as any);
  const { chatUserList } = useFetchChatUserList(user.id);

  const handleChat = (chatRoomId: string, chatRoomName: string) => {
    event.emit(CHAT_WITH_USER, { chatRoomId, chatRoomName });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          width: "100%",
          borderRadius: 1,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <MoreOptions />
      </div>

      <ScrollBox flex={19}>
        <List
          dataSource={chatUserList!}
          renderItem={(item) => (
            <List.Item
              style={{ padding: "10px" }}
              main={
                <div className={styles.listItem}>
                  <Avatar size="small" color="blue" className={styles.avatar}>
                    {item.charRoomName[0]}
                  </Avatar>
                  <div
                    className={styles.title}
                    onClick={() =>
                      handleChat(item.charRoomId, item.charRoomName)
                    }
                  >
                    {item.charRoomName}
                  </div>
                </div>
              }
              extra={<Button icon={<IconMore />} />}
            />
          )}
        />
      </ScrollBox>
    </div>
  );
};

export default ChatLeft;
