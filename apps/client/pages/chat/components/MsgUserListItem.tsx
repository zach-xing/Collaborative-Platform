import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Badge,
  Avatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

/**
 * 聊天界面的用户列表的 item
 */
const MsgUserListItem = () => {
  return (
    <ListItem alignItems="center">
      <ListItemButton>
        <ListItemAvatar>
          <Badge badgeContent={0} color="primary">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
  );
};

export default React.memo(MsgUserListItem);
