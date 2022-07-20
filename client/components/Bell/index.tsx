import { IconBell } from "@douyinfe/semi-icons";
import {
  Badge,
  Button,
  Collapse,
  SideSheet,
  Space,
  Toast,
} from "@douyinfe/semi-ui";
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
    handleFetchMessage();
    bellSocketRef.current.on("recvMssage", handleRecvMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 处理获取 Message 信息
  const handleFetchMessage = () => {
    bellSocketRef.current.emit("fetchMessage", user.id, (response: any) => {
      setMessageArr([...response]);
    });
  };

  // 处理接收的信息
  const handleRecvMessage = (data: IMessageItem) => {
    if (user.id === data.recvUserId) {
      setMessageArr([data, ...messageArr]);
    }
  };

  // 处理反馈的信息
  const handleFeedBack = (id: string, state: "agree" | "reject") => {
    bellSocketRef.current.emit("feedbackMessage", { id, state }, (res: any) => {
      console.log(res);

      if (res.status) {
        Toast.error(res.message);
      } else {
        Toast.success("反馈成功");
      }
      handleFetchMessage();
      setVisible(false);
    });
  };

  // 删除的信息
  const handleDelete = (id: string) => {
    bellSocketRef.current.emit("deleteMessage", { id }, (res: any) => {
      if (res.status) {
        Toast.error(res.message);
      } else {
        Toast.success("删除成功");
      }
      handleFetchMessage();
      setVisible(false);
    });
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
              {item.state === "pending" ? (
                <Space>
                  <Button onClick={() => handleFeedBack(item.id, "agree")}>
                    同意
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => handleFeedBack(item.id, "reject")}
                  >
                    拒绝
                  </Button>
                </Space>
              ) : (
                <Space>
                  <Button disabled>
                    {item.state === "agree" ? "已同意" : "已拒绝"}
                  </Button>
                  <Button
                    theme="light"
                    type="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    删除此条信息
                  </Button>
                </Space>
              )}
            </Collapse.Panel>
          ))}
        </Collapse>
      </SideSheet>
    </>
  );
};

export default Bell;
