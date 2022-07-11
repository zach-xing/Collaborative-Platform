import { IconSend } from "@douyinfe/semi-icons";
import { Button, Card, TextArea } from "@douyinfe/semi-ui";
import React from "react";
import ChatMsgBubbleList from "./ChatBubbleMsgComp";
import ScrollBox from "../ScrollBox";

import styles from "./index.module.scss";

const ChatRight = () => {
  return (
    <Card
      title="Semi Design"
      style={{ width: "100%", height: "100%" }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 64px)",
      }}
      headerExtraContent={<div>更多</div>}
    >
      <ScrollBox flex={7}>
        <ChatMsgBubbleList id={"1"} />
      </ScrollBox>

      <div style={{ flex: 2 }}>
        <TextArea maxCount={100} showClear />
      </div>

      <div style={{ flex: 1 }}>
        <Button theme="solid" icon={<IconSend />}>
          Click
        </Button>
      </div>
    </Card>
  );
};

export default ChatRight;
