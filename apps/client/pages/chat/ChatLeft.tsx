import { Box, Button, List, Menu, MenuItem } from "@mui/material";
import React from "react";
import ScrollBox from "../../components/ScrollBox";
import MoreOptions from "./components/MoreOptions";
import MsgUserListItem from "./components/MsgUserListItem";

/**
 * 消息列表
 */
const ChatLeft = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          flex: 1,
          backgroundColor: "primary.light",
          borderRadius: 1,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <MoreOptions />
      </Box>

      <ScrollBox sx={{ flex: 19 }}>
        <List
          dense
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: 360,
          }}
        >
          {new Array(10).fill(0).map((_, idx) => (
            <MsgUserListItem key={idx} />
          ))}
        </List>
      </ScrollBox>
    </Box>
  );
};

export default ChatLeft;
