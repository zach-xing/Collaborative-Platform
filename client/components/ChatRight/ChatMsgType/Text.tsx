import React from "react";

interface IProps {
  isMe: boolean; // 是否是本人
  value: string;
}

// 他人的信息样式
const msg = {
  maxWidth: "70%",
  width: "fit-content",
  padding: "10px",
  borderRadius: "3px",
  boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
};

const myMsg = {
  ...msg,
  backgroundColor: "#effdde",
};

/**
 * 聊天类型：文本
 */
const Text: React.FC<IProps> = (props) => {
  return <div style={props.isMe ? myMsg : msg}>{props.value}</div>;
};

export default Text;
