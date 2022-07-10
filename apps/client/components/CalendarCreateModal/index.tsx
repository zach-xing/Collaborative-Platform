import { Button, Form, Modal } from '@douyinfe/semi-ui'
import React from 'react'

interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 创建 日程 时的 Modal
 */
const CalendarCreateModal:React.FC<IProps> = (props) => {

  const { visible, setVisible } = props;

  const handleCancel =() => {
    setVisible(false);
  }
  const handleSubmit =() => {
    setVisible(false);
  }


  return (
    <Modal
      title="创建日程"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      closeOnEsc={true}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Input
          field="taskName"
          label="日程名"
          style={{ width: "100%" }}
          placeholder="Enter task name"
          rules={[{ required: true, message: "必填项" }]}
        ></Form.Input>
        <Form.DatePicker
          field="startTime"
          label="开始时间"
        ></Form.DatePicker>
        <Form.DatePicker
          field="endTime"
          label="结束时间"
        ></Form.DatePicker>
        <Form.TextArea
          field="desc"
          label="日程描述"
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
          <Button htmlType="submit">Create</Button>
        </div>
      </Form>
    </Modal>
  );
}

export default CalendarCreateModal