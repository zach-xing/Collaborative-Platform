import React from "react";
import Image from "next/image";

interface IProps {
  value: string; // 这里表示 url
}

/**
 * 聊天类型：图片
 */
const ImageComp: React.FC<IProps> = (props) => {
  return (
    <div style={{ position: "relative", width: "50%", height: "100%" }}>
      <Image
        style={{ borderRadius: "5px" }}
        loader={() => props.value}
        src={props.value}
        alt={props.value}
        width={"100%"}
        height={"100%"}
        layout="responsive"
      />
    </div>
  );
};

export default ImageComp;
