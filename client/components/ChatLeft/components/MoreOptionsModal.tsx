import { Modal, Form, Button, Toast } from "@douyinfe/semi-ui";
import React from "react";
import { io } from "socket.io-client";
import { createGroup } from "../../../data/chatroom";
import { useFetchFriends } from "../../../data/friend";
import useLocalStorage from "../../../hooks/use-localStorage";
import { IUser } from "../../../types";

interface IProps {
  title: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * MoreOptions 对应的 Modal 组件
 */
const MoreOptionsModal: React.FC<IProps> = (props) => {
  const { title, visible, setVisible } = props;
  const optSocketRef = React.useRef<any>(
    io("ws://127.0.0.1:8888", { path: "/message" })
  );
  const [user, _] = useLocalStorage<IUser>("user", {} as any);
  const { friendList, refetch } = useFetchFriends(user.id);

  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      optSocketRef.current?.disconnect();
    };
  }, []);

  // 若是创建群组，并且是已打开了 Modal，就获取 firend 列表
  if (props.title === "create-group" && visible === true) {
    refetch();
  }

  const handleSubmit = async (value: any) => {
    try {
      if (title === "create-group") {
        await createGroup({
          ids: [...value.ids, user.id],
          name: value.name,
        });
      } else {
        optSocketRef.current.emit("sendMessage", {
          sendId: user.id,
          email: value.email,
        });
      }
      Toast.success("发送成功");
    } catch (err: any) {
      Toast.success(err.message || "添加/创建有误");
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      closeOnEsc={true}
    >
      <Form labelPosition="inset" onSubmit={handleSubmit}>
        {title === "create-group" ? (
          // 创建群组
          <>
            <Form.Input
              field="name"
              label="群组名称"
              trigger="blur"
              rules={[
                { required: true, message: "必填项" },
                { type: "string", message: "type error" },
              ]}
            />
            <Form.Select
              multiple
              label="邀请用户"
              field="ids"
              rules={[
                { required: true, message: "必填项" },
                { type: "array", min: 2, message: "最少加入两个" },
              ]}
            >
              {friendList?.map((item) => (
                <Form.Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Form.Select.Option>
              ))}
            </Form.Select>

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginBottom: "20px" }}
            >
              Submit
            </Button>
          </>
        ) : (
          <>
            <Form.Input
              field="email"
              label="用户 email"
              trigger="blur"
              rules={[
                { required: true, message: "必填项" },
                { type: "string", message: "type error" },
              ]}
            />

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginBottom: "20px" }}
            >
              Submit
            </Button>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default MoreOptionsModal;
