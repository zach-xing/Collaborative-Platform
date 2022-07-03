import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { MdInsertPhoto, MdOutlineFolderOpen, MdSend } from "react-icons/md";
import ScrollBox from "../../../components/ScrollBox";
import MsgBubbleList from "./MsgBubbleList";

interface IProps {
  chatId: string;
}

/**
 * 消息的展示处
 */
const MsgShow = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          flex: 1,
          borderRadius: 1,
          backgroundColor: "primary.light",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography
          noWrap
          sx={{
            fontSize: "20px",
            pl: 5,
            userSelect: "none",
          }}
        >
          Name
        </Typography>
      </Box>

      <ScrollBox sx={{ flex: 7 }}>
        <MsgBubbleList />
      </ScrollBox>

      <Box sx={{ flex: 2, display: "flex" }}>
        <Box sx={{ flex: 9 }}>
          <TextField
            label="输入..."
            multiline
            rows={4}
            fullWidth
            defaultValue="Default Value"
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <ButtonGroup orientation="vertical">
            <Button
              variant="outlined"
              size="large"
              endIcon={<MdOutlineFolderOpen />}
            >
              FILE
            </Button>
            <Button variant="outlined" size="large" endIcon={<MdInsertPhoto />}>
              PHOTO
            </Button>
            <Button variant="contained" size="large" endIcon={<MdSend />}>
              SEND
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default MsgShow;
