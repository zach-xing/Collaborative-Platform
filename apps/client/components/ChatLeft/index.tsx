import React from "react";
import { Avatar, Button, List, Spin } from "@douyinfe/semi-ui";
import { IconMore } from "@douyinfe/semi-icons";
import ScrollBox from "../ScrollBox";
import MoreOptions from "./components/MoreOptions";
import { useFetchChatUserList } from "../../data/chat";

import styles from "./index.module.scss";

const ChatLeft = () => {
  const { chatUserList, isLoadingWithChatUserList } = useFetchChatUserList();

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
        {isLoadingWithChatUserList ? (
          <div>Loading...</div>
        ) : (
          <List
            dataSource={chatUserList}
            renderItem={(item) => (
              <List.Item
                main={
                  <div className={styles.listItem}>
                    <Avatar color="blue" className={styles.avatar}>
                      {item.name}
                    </Avatar>
                    <div>
                      <div className={styles.userinfo}>
                        <span className={styles.title}>{item.name}</span>
                        <Button icon={<IconMore />} />
                      </div>
                      <p className={styles.content}>{item.latestMsg}</p>
                    </div>
                  </div>
                }
              />
            )}
          />
        )}
      </ScrollBox>
    </div>
  );
};

export default ChatLeft;
