import React from "react";
import { useRouter } from "next/router";
import { Nav } from "@douyinfe/semi-ui";
import {
  IconHome,
  IconHistogram,
  IconLive,
  IconSetting,
} from "@douyinfe/semi-icons";

const navArr: Array<{ itemKey: string; text: string; icon: React.ReactNode }> =
  [
    {
      itemKey: "chat",
      text: "消息",
      icon: <IconHome size="large" />,
    },
    {
      itemKey: "task",
      text: "任务",
      icon: <IconHistogram size="large" />,
    },
    {
      itemKey: "workbench",
      text: "工作台",
      icon: <IconLive size="large" />,
    },
    {
      itemKey: "clouddocument",
      text: "云文档",
      icon: <IconSetting size="large" />,
    },
    {
      itemKey: "calendar",
      text: "日历",
      icon: <IconSetting size="large" />,
    },
  ];

const Sidebar = () => {
  const router = useRouter();
  const [currUrl, setCurrUrl] = React.useState<string>("chat");

  return (
    <Nav
      style={{ maxWidth: 220, height: "100%" }}
      defaultIsCollapsed
      selectedKeys={[currUrl]}
      onSelect={(e: any) => setCurrUrl(e.itemKey)}
    >
      {navArr.map((item) => (
        <Nav.Item
          key={item.itemKey}
          itemKey={item.itemKey}
          text={item.text}
          icon={item.icon}
          onClick={() => router.push(`/${item.itemKey}`)}
        />
      ))}
    </Nav>
  );
};

export default Sidebar;
