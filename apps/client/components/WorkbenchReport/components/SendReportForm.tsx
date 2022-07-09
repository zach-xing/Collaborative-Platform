import { Button, Form } from "@douyinfe/semi-ui";
import React from "react";

const infoArr = [
  { title1: "今日总结", title2: "明日计划" },
  { title1: "本周总结", title2: "下周计划" },
  { title1: "本月总结", title2: "下月计划" },
];

interface IProps {
  flag: 0 | 1 | 2; // 0表示日报、1表示周报、2表示月报
}

/**
 * SendReportForm 组件
 */
const SendReportForm: React.FC<IProps> = (props) => {
  const { flag } = props;

  const handleSubmit = () => {};

  return (
    <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
      <Form.TextArea
        field="report1"
        label={infoArr[flag].title1}
      ></Form.TextArea>
      <Form.TextArea
        field="report2"
        label={infoArr[flag].title2}
      ></Form.TextArea>
      <Form.TextArea
        field="other"
        label="其他"
        trigger="blur"
        placeholder="请输入"
      />

      <Button type="primary" htmlType="submit" block>
        提交
      </Button>
    </Form>
  );
};

export default SendReportForm;
