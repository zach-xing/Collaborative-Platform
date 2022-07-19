import { IconBell } from "@douyinfe/semi-icons";
import { Badge, Button, Collapse, SideSheet, Space } from "@douyinfe/semi-ui";
import React from "react";
import { io } from "socket.io-client";
import useLocalStorage from "../../hooks/use-localStorage";
import { IMessageItem, IUser } from "../../types";

/**
 * 实时通知的 Bell
 */
const Bell = () => {
  const bellSocketRef = React.useRef<any>(
    io("ws://127.0.0.1:8888", { path: "/message" })
  );
  const [user, _] = useLocalStorage<IUser>("user", {} as any);
  const [visible, setVisible] = React.useState(false);
  const [messageArr, setMessageArr] = React.useState<Array<IMessageItem>>([]);

  React.useEffect(() => {
    bellSocketRef.current.emit("fetchMessage", user.id, (response: any) => {
      console.log(response);

      setMessageArr(response);
    });
    bellSocketRef.current.on("recvMssage", handleRecvMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRecvMessage = (data: IMessageItem) => {
    console.log(user.id, data.recvUserId);

    if (user.id === data.recvUserId) {
      setMessageArr([data, ...messageArr]);
    }
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
        <Collapse accordion>
          {messageArr.map((item) => (
            <Collapse.Panel
              key={item.id}
              header={item.message}
              itemKey={item.id}
            >
              <Space>
                <Button>同意</Button>
                <Button type="danger">拒绝</Button>
              </Space>
            </Collapse.Panel>
          ))}
        </Collapse>
      </SideSheet>
    </>
  );
};

export default Bell;
