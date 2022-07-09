import { Button, Form, Modal } from "@douyinfe/semi-ui";
import React from "react";

interface IProps {
  flag: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 在“任务”页面 创建任务的模态框
 */
const TaskCreateModal: React.FC<IProps> = (props) => {
  const { visible, setVisible } = props;

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (obj: any) => {
    console.log(obj);
  };

  return (
    <Modal
      title="创建任务"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      closeOnEsc={true}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Input
          field="taskName"
          label="任务名"
          style={{ width: "100%" }}
          placeholder="Enter task number"
          rules={[{ required: true, message: "必填项" }]}
        ></Form.Input>
        <Form.TextArea
          field="desc"
          label="任务描述"
          style={{ width: "100%" }}
          placeholder="Enter task description"
          rules={[{ required: true, message: "必填项" }]}
          maxCount={100}
          showClear
        ></Form.TextArea>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskCreateModal;
