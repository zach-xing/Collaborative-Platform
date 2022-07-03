import React from "react";
import { useRouter } from "next/router";
import { Box, Stack, Tooltip, IconButton } from "@mui/material";
import {
  MdMessage,
  MdFolderOpen,
  MdDashboard,
  MdToc,
  MdCalendarToday,
} from "react-icons/md";

const navArr = [
  {
    id: 1,
    title: "消息",
    url: "/chat",
    iconComp: <MdMessage size="25" />,
  },
  {
    id: 2,
    title: "任务",
    url: "/task",
    iconComp: <MdToc size="25" />,
  },
  {
    id: 3,
    title: "工作台",
    url: "/workbench",
    iconComp: <MdDashboard size="25" />,
  },
  {
    id: 4,
    title: "云文档",
    url: "/clouddocument",
    iconComp: <MdFolderOpen size="25" />,
  },
  {
    id: 5,
    title: "日历",
    url: "/calendar",
    iconComp: <MdCalendarToday size="25" />,
  },
];

/**
 * 侧边栏
 */
const Sidebar = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        position: "fixed",
        top: 64,
        left: 0,
        bottom: 0,
        width: 64,
        pt: 5,
        backgroundColor: "white",
        borderRadius: "0 10px 10px 0",
      }}
    >
      <Stack spacing={2}>
        {navArr.map((nav) => (
          <Tooltip key={nav.id} title={nav.title} placement="right">
            <IconButton
              onClick={() => router.push(nav.url)}
              sx={
                router.route === nav.url
                  ? { backgroundColor: "primary.light" }
                  : null
              }
            >
              {nav.iconComp}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar;
