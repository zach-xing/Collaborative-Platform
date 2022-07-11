import { Button, Form, Toast } from "@douyinfe/semi-ui";
import React from "react";
import {
  sendLeaveApplication,
  sendOutsideApplication,
  sendOvertimeApplication,
} from "../../../data/workbench";

const typeArr = [
  {
    type: 1,
    label: "年假",
  },
  {
    type: 2,
    label: "事假",
  },
  {
    type: 3,
    label: "病假",
  },
  {
    type: 4,
    label: "调休假",
  },
  {
    type: 5,
    label: "婚假",
  },
  {
    type: 6,
    label: "产假",
  },
  {
    type: 7,
    label: "陪产假",
  },
  {
    type: 8,
    label: "丧假",
  },
  {
    type: 9,
    label: "哺乳假",
  },
];

interface IProps {
  flag: "1" | "2" | "3";
}

/**
 * Modal 中的 SendApplyForm 组件
 */
const SendApplyForm: React.FC<IProps> = (props) => {
  const handleSubmit = async (value: any) => {
    // TODO:“外出”组件的 submit 功能
    try {
      if (props.flag === "1") {
        await sendLeaveApplication(value);
      } else if (props.flag === "2") {
        await sendOvertimeApplication(value);
      } else {
        await sendOutsideApplication(value);
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
      <Form.DatePicker
        type="dateTime"
        field="startTime"
        label="开始时间"
      ></Form.DatePicker>
      <Form.DatePicker
        type="dateTime"
        field="endTime"
        label="结束时间"
      ></Form.DatePicker>
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
