import React from "react";
import { Avatar, Button, Divider, List } from "@douyinfe/semi-ui";
import ScrollBox from "../ScrollBox";
import MoreOptions from "./components/MoreOptions";

import styles from "./index.module.scss";
import { IconMore } from "@douyinfe/semi-icons";

const data = [
  "Semi Design 是由互娱社区前端团队与 UED团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的Web 应用。",
  "Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的Web 应用。",
  "Semi Design 以用户中心、内容优先、设计人性化的设计系统，打造一致、好看、好用、高效的用户体验。",
  "sdf",
  "sdf",
  "sdfsdfsfsdfds",
  "sdf",
  "sdfsdfsfsdfds",
];

const ChatLeft = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          width: "100%",
          borderRadius: 1,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <MoreOptions />
      </div>

      <ScrollBox flex={19}>
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              header={<Avatar color="blue">SE</Avatar>}
              main={
                <div className={styles.listItem}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span className={styles.title}>示例标题</span>
                    <Button icon={<IconMore />} />
                  </div>
                  <p className={styles.content}>{item}</p>
                </div>
              }
            />
          )}
        />
      </ScrollBox>
    </div>
  );
};

export default ChatLeft;
