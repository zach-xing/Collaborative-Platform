import { Button, Form } from "@douyinfe/semi-ui";
import React from "react";

/**
 * Modal 中的 加班 组件
 */
const Overtime = () => {
  const handleSubmit = () => {
    // TODO:“加班”组件的 submit 功能
  }
  
  return (
    <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
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
        label="加班事由"
        trigger="blur"
        placeholder="请输入"
      />

      <Button type="primary" htmlType="submit" block>
        提交
      </Button>
    </Form>
  );
};

export default Overtime;
