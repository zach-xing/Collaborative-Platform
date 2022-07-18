import { Button, Form, Toast } from "@douyinfe/semi-ui";
import React from "react";
import { sendReport } from "../../../data/workbench";
import useLocalStorage from "../../../hooks/use-localStorage";

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
  const [user, _] = useLocalStorage("user", "");

  const handleSubmit = async (value: any) => {
    try {
      if (flag === 0) {
        await sendReport(user.id, "day", value);
      } else if (flag === 1) {
        await sendReport(user.id, "week", value);
      } else {
        await sendReport(user.id, "month", value);
      }
      Toast.success("发送成功");
    } catch (err) {
      Toast.error("出错了");
    }
  };

  return (
    <Form style={{ width: "40%" }} onSubmit={handleSubmit}>
      <Form.Input
        field="title"
        label="标题"
        rules={[{ required: true, message: "必填项" }]}
      ></Form.Input>
      <Form.TextArea
        field="curReport"
        label={infoArr[flag].title1}
        rules={[{ required: true, message: "必填项" }]}
      ></Form.TextArea>
      <Form.TextArea
        field="prevReport"
        label={infoArr[flag].title2}
        rules={[{ required: true, message: "必填项" }]}
      ></Form.TextArea>
      <Form.TextArea
        field="otherReport"
        label="其他"
        trigger="blur"
        placeholder="请输入"
        rules={[{ required: true, message: "必填项" }]}
      />

      <Button type="primary" htmlType="submit" block>
        提交
      </Button>
    </Form>
  );
};

export default SendReportForm;
