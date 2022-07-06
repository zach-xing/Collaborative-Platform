import React from "react";
import ChatLeft from "../../components/ChatLeft";
import ChatRight from "../../components/ChatRight";
import styles from "./index.module.scss";

/**
 * 消息 页面
 */
const Chat = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, borderRadius: 1, backgroundColor: "white" }}>
        <ChatLeft />
      </div>

      <div
        style={{
          flex: 3,
          marginLeft: 1,
          borderRadius: 1,
          backgroundColor: "white",
        }}
      >
        <ChatRight />
      </div>
    </div>
  );
};

export default Chat;
