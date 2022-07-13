import React from "react";
import { useRouter } from "next/router";
import { Nav } from "@douyinfe/semi-ui";
import {
  IconAppCenter,
  IconCalendar,
  IconCloud,
  IconComment,
  IconGallery,
} from "@douyinfe/semi-icons";

const navArr: Array<{ itemKey: string; text: string; icon: React.ReactNode }> =
  [
    {
      itemKey: "chat",
      text: "消息",
      icon: <IconComment size="large" />,
    },
    {
      itemKey: "task",
      text: "任务",
      icon: <IconGallery size="large" />,
    },
    {
      itemKey: "workbench",
      text: "工作台",
      icon: <IconAppCenter size="large" />,
    },
    {
      itemKey: "clouddocument",
      text: "云文档",
      icon: <IconCloud size="large" />,
    },
    {
      itemKey: "calendar",
      text: "日历",
      icon: <IconCalendar size="large" />,
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
