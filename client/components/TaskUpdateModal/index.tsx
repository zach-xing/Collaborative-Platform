import { Button, Form, Modal } from "@douyinfe/semi-ui";
import React from "react";
import type { ITask } from "../../types";

interface IProps {
  flag: string;
  task: ITask | null;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 在“任务”页面 编辑任务的模态框
 */
const TaskUpdateModal: React.FC<IProps> = (props) => {
  const { visible, setVisible, task } = props;
  
  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (obj: any) => {
    // TODO: 发送提交POST请求
    console.log(obj);
    handleCancel();
  };

  return (
    <Modal
      title="编辑任务"
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
          initValue={task?.taskName}
        ></Form.Input>
        <Form.TextArea
          field="desc"
          label="任务描述"
          style={{ width: "100%" }}
          placeholder="Enter task description"
          rules={[{ required: true, message: "必填项" }]}
          maxCount={100}
          showClear
          initValue={task?.desc}
        ></Form.TextArea>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button htmlType="submit">Submit</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskUpdateModal;
