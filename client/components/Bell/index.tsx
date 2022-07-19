import { IconBell } from "@douyinfe/semi-icons";
import { Badge, Button, SideSheet } from "@douyinfe/semi-ui";
import React from "react";
import { io } from "socket.io-client";

/**
 * 实时通知的 Bell
 */
const Bell = () => {
  const bellSocketRef = React.useRef<any>(
    io("ws://127.0.0.1:8888", { path: "/message" })
  );
  const [visible, setVisible] = React.useState(false);
  const [messageArr, setMessageArr] = React.useState([]);

  React.useEffect(() => {
    bellSocketRef.current.emit("fetchMessage", "my id", (response: any) => {
      setMessageArr(response);
    });
  }, []);

  return (
    <>
      <Button
        theme="borderless"
        icon={
          <Badge count={messageArr.length} overflowCount={99} type="warning">
            <IconBell size="large" />
          </Badge>
        }
        style={{
          color: "var(--semi-color-text-2)",
          marginRight: "12px",
        }}
        onClick={() => setVisible(true)}
      />

      <SideSheet
        title="通知"
        visible={visible}
        onCancel={() => setVisible(!visible)}
      >
        <p>This is the content of a basic sidesheet.</p>
        <p>Here is more content...</p>
      </SideSheet>
    </>
  );
};

export default Bell;
