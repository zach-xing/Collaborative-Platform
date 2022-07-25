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
import { event, SAVE_FILE_CONTENT } from "../../events";
import CommonEditor from "./CommonEditor";
import CollaborateEditor from "./CollaborateEditor";
import { useFetchDocument } from "../../data/document";

import styles from "./editor.module.scss";

/**
 * 编辑的文档
 */
const CloudDocumentEditor = () => {
  const router = useRouter();
  const { documentData, isLoading, saveDocument } = useFetchDocument(
    router.query.id as string
  );
  console.log(documentData);
  if (isLoading) {
    return <>Loading...</>;
  }

  // 返回
  const handleBack = () => {
    Modal.warning({
      title: "是否已经保存",
      content: "若已经保存则可以点击 “确认返回” 按钮, 若未保存则可能会丢失更改",
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
        <Typography.Title heading={5}>{documentData?.title}</Typography.Title>
        <Space>
          <Button
            theme="solid"
            onClick={() => event.emit(SAVE_FILE_CONTENT, false)}
          >
            保存
          </Button>
          <AvatarGroup maxCount={2} size="small">
            <Avatar color="red" alt="Lisa LeBlanc" size="extra-small">
              LL
            </Avatar>
          </AvatarGroup>
        </Space>
      </div>
      <div className={styles.container}>
        <CommonEditor data={documentData!} saveDocument={saveDocument} />
      </div>
      {/* <CollaborateEditor /> */}
    </>
  );
};

export default CloudDocumentEditor;
