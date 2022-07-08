import { Tag } from "@douyinfe/semi-ui";
import type { TagColor } from "@douyinfe/semi-ui/lib/es/tag";

interface IProps {
  state: "agree" | "reject" | "pending";
}

/**
 * 封装一遍 Tag 标签
 */
const StateTag = (props: IProps) => {
  let color: TagColor = "green",
    text = "通过";
  if (props.state === "reject") {
    color = "red";
    text = "未通过";
  } else if (props.state === "pending") {
    color = "blue";
    text = "待处理";
  }
  return (
    <Tag size="large" color={color}>
      {text}
    </Tag>
  );
};

export default StateTag;
