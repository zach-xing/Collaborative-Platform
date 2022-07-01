import React from "react";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import { MdMessage } from "react-icons/md";

const navArr = [
  {
    id: 1,
    title: "消息",
    url: "",
    iconComp: <MdMessage size="25" />,
  },
  {
    id: 2,
    title: "任务",
    url: "",
    iconComp: <MdMessage size="25" />,
  },
  {
    id: 3,
    title: "工作台",
    url: "",
    iconComp: <MdMessage size="25" />,
  },
  {
    id: 4,
    title: "文档",
    url: "",
    iconComp: <MdMessage size="25" />,
  },
  {
    id: 5,
    title: "日历",
    url: "",
    iconComp: <MdMessage size="25" />,
  },
];

/**
 * 侧边栏
 */
const Sidebar = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        left: 0,
        bottom: 0,
        width: 64,
        backgroundColor: "#eee",
        borderRadius: "0 10px 10px 0",
      }}
    >
      <Stack spacing={2}>
        {navArr.map((nav) => (
          <Tooltip key={nav.id} title={nav.title} placement="right">
            <IconButton>{nav.iconComp}</IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
