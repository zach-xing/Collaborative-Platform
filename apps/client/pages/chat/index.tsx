import React from "react";
import { Box } from "@mui/material";
import ChatLeft from "./ChatLeft";
import ChatRight from "./ChatRight";

const Chat = () => {
  return (
    <>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            flex: 1,
            borderRadius: 1,
            backgroundColor: "white",
          }}
        >
          <ChatLeft />
        </Box>

        <Box sx={{ flex: 3, ml: 1, borderRadius: 1, backgroundColor: "white" }}>
          <ChatRight />
        </Box>
      </Box>
    </>
  );
};

export default Chat;
