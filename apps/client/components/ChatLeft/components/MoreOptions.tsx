import React from "react";
import { Dropdown, Button, Typography } from "@douyinfe/semi-ui";
import { IconMenu } from "@douyinfe/semi-icons";

const MoreOptions = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography.Title heading={5} style={{ margin: "8px 0" }}>
          列表
        </Typography.Title>

        <Dropdown
          trigger={"click"}
          position={"bottomLeft"}
          render={
            <Dropdown.Menu>
              <Dropdown.Item>添加联系人</Dropdown.Item>
              <Dropdown.Item>新建群聊</Dropdown.Item>
              <Dropdown.Item>加入群聊</Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Button icon={<IconMenu />} />
        </Dropdown>
      </div>
    </>
  );
};

export default MoreOptions;
