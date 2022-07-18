import React from "react";
import { Button, Form, Modal, Space, Toast } from "@douyinfe/semi-ui";
import { useUser } from "../../data/user";

interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 登录 组件
 */
const Login = (props: IProps) => {
  const { login } = useUser();
  const { visible, setVisible } = props;

  const handleSubmit = async (values: any) => {
    await login(values);
    setVisible(false);
    location.reload();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="登录"
      visible={visible}
      onCancel={handleCancel}
      maskClosable={false}
      footer={null}
    >
      <Form labelPosition="inset" onSubmit={handleSubmit}>
        <Form.Input
          field="email"
          label="邮箱"
          trigger="blur"
          rules={[
            { required: true, message: "必填项" },
            { type: "string", message: "type error" },
          ]}
        />
        <Form.Input
          field="password"
          label="密码"
          mode="password"
          trigger="blur"
          rules={[
            { required: true, message: "必填项" },
            { type: "string", message: "type error" },
          ]}
        />

        <Space
          align="center"
          spacing="medium"
          style={{ margin: "10px 0", marginBottom: "20px" }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default Login;
