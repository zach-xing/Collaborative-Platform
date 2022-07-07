import { Avatar, Popover } from "@douyinfe/semi-ui";
import React from "react";

import styles from "./index.module.scss";

/**
 * 每个消息的样式
 */
const BubbleMsgComp: React.FC<{ msg: string }> = (props) => {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "20px 10px" }}>
      <Avatar alt="Zeekg">Z</Avatar>
      <Popover
        position={"right"}
        content={<div style={{ padding: 5 }}>{"2022.7.7"}</div>}
      >
        <div className={styles.msg}>{props.msg}</div>
      </Popover>
    </div>
  );
};

/**
 * 展示消息气泡的列表
 */
const ChatMsgBubbleList = () => {
  return (
    <>
      {new Array(15).fill(0).map((_, idx) => (
        <BubbleMsgComp
          key={idx}
          msg="标签是图形化标记界面上的元素的组件，达到快速识别、分组的目的。标签是图形化标记界面上的元素的组件，达到快速识别、分组的目的"
        />
      ))}
    </>
  );
};

export default ChatMsgBubbleList;
