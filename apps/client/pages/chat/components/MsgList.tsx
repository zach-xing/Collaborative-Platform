import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

/**
 * 消息列表
 */
const MsgList = () => {
  return (
    <>
      <List
        dense
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: 360,
        }}
      >
        {new Array(10).fill(0).map((_, idx) => (
          <ListItem key={idx} alignItems="center">
            <ListItemButton>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Brunch this weekend?</Typography>
                    <Typography sx={{ color: "gray", fontSize: 12 }}>
                      19.22
                    </Typography>
                  </Box>
                }
                secondary={
                  <Typography
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    color="text.secondary"
                  >
                    I ll be in your neighborhood doing errands this…
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default MsgList;
