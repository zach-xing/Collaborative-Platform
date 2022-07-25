import React from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Modal,
  Space,
  Typography,
} from "@douyinfe/semi-ui";
import { IconChevronLeft } from "@douyinfe/semi-icons";
import { useRouter } from "next/router";
import CommonEditor from "./CommonEditor";
import CollaborateEditor from "./CollaborateEditor";

import styles from "./editor.module.scss";

/**
 * 编辑的文档
 */
const CloudDocumentEditor = () => {
  const router = useRouter();

  // 返回
  const handleBack = () => {
    Modal.warning({
      title: "是否已经保存",
      content: "若已经保存则可以点击 “确认返回” 按钮",
      okText: "确认返回",
      onOk: () => {
        router.back();
      },
    });
  };

  return (
    <>
      <div className={styles.height}>
        <Button icon={<IconChevronLeft />} onClick={handleBack} />
        <Typography.Title heading={5}>这是此文章标题</Typography.Title>
        <Space>
          <Button theme="solid">保存</Button>
          <AvatarGroup maxCount={2} size="small">
            <Avatar color="red" alt="Lisa LeBlanc" size="extra-small">
              LL
            </Avatar>
          </AvatarGroup>
        </Space>
      </div>
      <div className={styles.container}>
        <CommonEditor />
      </div>
      {/* <CollaborateEditor /> */}
    </>
  );
};

export default CloudDocumentEditor;
