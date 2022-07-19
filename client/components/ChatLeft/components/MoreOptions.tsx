import React from "react";
import { Dropdown, Button, Typography } from "@douyinfe/semi-ui";
import { IconMenu } from "@douyinfe/semi-icons";
import MoreOptionsModal from "./MoreOptionsModal";

type TOptions = "add-person" | "create-group";

/**
 * 更多操作
 */
const MoreOptions = () => {
  const [visible, setVisible] = React.useState(false);
  const [curOption, setCurOption] = React.useState<TOptions>("add-person");

  React.useEffect(() => {
    // optSocketRef.current.on('');
  }, []);

  const handleOptions = (str: TOptions) => {
    setCurOption(str);
    setVisible(true);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
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
              <Dropdown.Item onClick={() => handleOptions("add-person")}>
                添加联系人
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleOptions("create-group")}>
                新建群聊
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Button icon={<IconMenu />} />
        </Dropdown>
      </div>

      <MoreOptionsModal
        title={curOption}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default MoreOptions;
