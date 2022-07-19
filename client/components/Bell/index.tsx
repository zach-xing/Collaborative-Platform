import { IconBell } from "@douyinfe/semi-icons";
import { Badge, Button, SideSheet } from "@douyinfe/semi-ui";
import React from "react";
import { io } from "socket.io-client";
import { IMessageItem } from "../../types";

/**
 * 实时通知的 Bell
 */
const Bell = () => {
  const bellSocketRef = React.useRef<any>(
    io("ws://127.0.0.1:8888", { path: "/message" })
  );
  const [visible, setVisible] = React.useState(false);
  const [messageArr, setMessageArr] = React.useState<Array<IMessageItem>>([]);

  React.useEffect(() => {
    bellSocketRef.current.emit("fetchMessage", "my id", (response: any) => {
      setMessageArr(response);
    });
    bellSocketRef.current.on("recvMssage", handleRecvMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecvMessage = (data: IMessageItem) => {
    setMessageArr([data, ...messageArr]);
  };

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
        {messageArr.length !== 0 ? (
          messageArr.map((item) => <>{item.message}</>)
        ) : (
          <>暂无数据</>
        )}
      </SideSheet>
    </>
  );
};

export default Bell;
