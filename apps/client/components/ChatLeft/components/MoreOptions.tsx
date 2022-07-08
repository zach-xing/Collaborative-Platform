import React from "react";
import { Dropdown, Button, Typography, Modal, Form } from "@douyinfe/semi-ui";
import { IconMenu } from "@douyinfe/semi-icons";

type TOptions = "add-person" | "create-group" | "add-group";

/**
 * 更多操作
 */
const MoreOptions = () => {
  const [visible, setVisible] = React.useState(false);
  const [curOption, setCurOption] = React.useState<TOptions>("add-person");

  const handleOptions = (str: TOptions) => {
    setCurOption(str);
    setVisible(true);
  };

  const handleSubmit = () => {};

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
              <Dropdown.Item onClick={() => handleOptions("add-group")}>
                加入群聊
              </Dropdown.Item>
            </Dropdown.Menu>
          }
        >
          <Button icon={<IconMenu />} />
        </Dropdown>
      </div>

      <Modal
        title={curOption}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
      >
        {curOption === "create-group" ? (
          <Form labelPosition="inset" onSubmit={handleSubmit}>
            <Form.Input
              field="account"
              label="群组名称"
              trigger="blur"
              rules={[
                { required: true, message: "必填项" },
                { type: "string", message: "type error" },
              ]}
            />
            <Form.Input
              field="account"
              label="群组描述"
              trigger="blur"
              rules={[{ required: true, message: "必填项" }]}
            />

            <Button
              type="primary"
              htmlType="submit"
              style={{ marginBottom: "20px" }}
            >
              Submit
            </Button>
          </Form>
        ) : (
          <Form labelPosition="inset" onSubmit={handleSubmit}>
            <Form.Input
              field="account"
              label={
                <div style={{ margin: "0 5px" }}>
                  {curOption === "add-person" ? "用户 ID" : "群组 ID"}
                </div>
              }
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
          </Form>
        )}
      </Modal>
    </>
  );
};

export default MoreOptions;
