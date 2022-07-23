import { IconFolder, IconMore, IconFile } from "@douyinfe/semi-icons";
import { Button, Col, Row, Tree, Typography } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import React from "react";
import CloundDocumentContent from "../../components/CloundDocumentContent";
import ScrollBox from "../../components/ScrollBox";
import type { ICloudFile } from "../../types";
import { event, SHOW_FILE_STRUCTURE } from "../../events";

import styles from "./index.module.scss";

const treeData: Array<ICloudFile> = [
  {
    label: "Asia",
    type: "folder",
    key: "0",
    children: [
      {
        label: "China",
        key: "0-0",
        type: "folder",
        children: [
          {
            label: "Beijing",
            key: "0-0-0",
            type: "file",
          },
          {
            label: "Shanghai",
            key: "0-0-1",
            type: "file",
          },
        ],
      },
      {
        label: "Japan",
        key: "0-1",
        type: "folder",
        children: [
          {
            label: "Osaka",
            key: "0-1-0",
            type: "file",
          },
        ],
      },
    ],
  },
  {
    label: "North America",
    key: "1",
    type: "folder",
    children: [
      {
        label: "United States",
        key: "1-0",
        type: "file",
      },
      {
        label: "Canada",
        key: "1-1",
        type: "file",
      },
    ],
  },
];

/**
 * 云文档 页面
 */
const CloundDocument = () => {
  const router = useRouter();

  const handleSelect = (selectedKey: string, selected: boolean, val: any) => {
    console.log(selectedKey, selected, val);
    if (val.type === "file") {
      router.push(`/clouddocument/${val.key}`);
    } else {
      event.emit(SHOW_FILE_STRUCTURE, val);
    }
  };

  return (
    <Row style={{ height: "100%" }}>
      <Col span={6} className={styles.left}>
        <Typography.Title heading={4} className={styles.text}>
          云文档
        </Typography.Title>
        <ScrollBox flex={14}>
          <Tree
            treeData={treeData}
            onSelect={handleSelect}
            renderFullLabel={({
              className,
              data,
              onClick,
              expandIcon,
            }: any) => {
              const isLeaf = data.type === "file";
              return (
                <li className={className} role="treeitem" onClick={onClick}>
                  {isLeaf ? null : expandIcon}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {isLeaf ? <IconFile /> : <IconFolder />}
                      <span style={{ marginLeft: "5px" }}>{data.label}</span>
                    </div>
                    <Button icon={<IconMore />} />
                  </div>
                </li>
              );
            }}
          />
        </ScrollBox>
      </Col>

      <Col span={18} className={styles.right}>
        <CloundDocumentContent />
      </Col>
    </Row>
  );
};

export default CloundDocument;
