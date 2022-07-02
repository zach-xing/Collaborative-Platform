import React from "react";
import { Box } from "@mui/material";
import MsgList from "./components/MsgList";
import MsgShow from "./components/MsgShow";
import ScrollBox from "../../components/ScrollBox";

const Chat = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100%" }}>
        <ScrollBox
          sx={{
            flex: 1,
            borderRadius: 1,
            // border: "1px solid black",
            height: "100%",
            overflow: "auto",
          }}
        >
          <MsgList />
        </ScrollBox>

        <Box
          sx={{ flex: 3, ml: 1, borderRadius: 1, border: "1px solid black" }}
        >
          <MsgShow />
        </Box>
      </Box>
    </>
  );
};

export default Chat;
