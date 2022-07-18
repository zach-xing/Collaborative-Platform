import { Button, Form, Toast } from "@douyinfe/semi-ui";
import React from "react";
import { sendApplication } from "../../../data/workbench";
import useLocalStorage from "../../../hooks/use-localStorage";
import { typeArr } from "../constant";

interface IProps {
  flag: "1" | "2" | "3";
}

/**
 * Modal 中的 SendApplyForm 组件
 */
const SendApplyForm: React.FC<IProps> = (props) => {
  const [user, _] = useLocalStorage("user", "");

  const handleSubmit = async (value: any) => {
    try {
      if (props.flag === "1") {
        await sendApplication(user.id, value);
      } else if (props.flag === "2") {
        await sendApplication(user.id, { type: -1, ...value });
      } else {
        await sendApplication(user.id, { type: 0, ...value });
      }
      Toast.success("发送成功");
    } catch (err) {
      Toast.error("发送失败");
    }
  };

  return (
    <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
      {props.flag === "1" && (
        <Form.Select
          field="type"
          label="请假类型"
          style={{ width: "100%" }}
          initValue={1}
        >
          {typeArr.map((item) => (
            <Form.Select.Option key={item.type} value={item.type}>
              {item.label}
            </Form.Select.Option>
          ))}
        </Form.Select>
      )}
      <Form.DatePicker field="startTime" label="开始时间"></Form.DatePicker>
      <Form.DatePicker field="endTime" label="结束时间"></Form.DatePicker>
      <Form.TextArea
        field="reason"
        label="事由"
        trigger="blur"
        placeholder="请输入"
      />

      <Button type="primary" htmlType="submit" block>
        提交
      </Button>
    </Form>
  );
};

export default SendApplyForm;
