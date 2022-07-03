import React from "react";
import { Avatar, Box, Paper, Tooltip } from "@mui/material";

/**
 * 每个消息的样式
 */
const BubbleMsgComp: React.FC<{ msg: string }> = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", m: "10px" }}>
      <Avatar
        alt="Zeekg"
        src="/static/images/avatar/1.jpg"
        sx={{ width: 30, height: 30 }}
      />
      <Tooltip title="2022.7.3 15.39" placement="right">
        <Paper sx={{ p: 1, ml: 2 }}>{props.msg}</Paper>
      </Tooltip>
    </Box>
  );
};

/**
 * 展示消息气泡的列表
 */
const MsgBubbleList = () => {
  return (
    <>
      {new Array(15).fill(0).map((_, idx) => (
        <BubbleMsgComp key={idx} msg="sdf111" />
      ))}
    </>
  );
};

export default MsgBubbleList;
