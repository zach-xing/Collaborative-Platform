import { Modal } from "@douyinfe/semi-ui";
import React from "react";

interface IProps {
  flag: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * 在“任务”页面 编辑任务的模态框
 */
const TaskUpdateModal: React.FC<IProps> = (props) => {
  const { visible, setVisible } = props;

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="编辑任务"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      closeOnEsc={true}
    >
      This is the content of a basic modal.
      <br />
      More content...
    </Modal>
  );
};

export default TaskUpdateModal;
