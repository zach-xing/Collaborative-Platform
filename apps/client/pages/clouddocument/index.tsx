import { IconFolder, IconMore } from "@douyinfe/semi-icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  Table,
  Tree,
  Typography,
} from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import React from "react";
import ScrollBox from "../../components/ScrollBox";

import styles from "./index.module.scss";

type FolderType = {
  key: string;
  label: string;
  value: string;
  updateTime: string;
  children?: FolderType[];
};

const treeData: Array<FolderType> = [
  {
    label: "Asia",
    value: "Asia",
    key: "0",
    updateTime: "2022.7.7",
    children: [
      {
        label: "China",
        value: "China",
        key: "0-0",
        updateTime: "2022.7.7",
        children: [
          {
            label: "Beijing",
            value: "Beijing",
            key: "0-0-0",
            updateTime: "2022.7.7",
          },
          {
            label: "Shanghai",
            value: "Shanghai",
            key: "0-0-1",
            updateTime: "2022.7.7",
          },
        ],
      },
      {
        label: "Japan",
        value: "Japan",
        key: "0-1",
        updateTime: "2022.7.7",
        children: [
          {
            label: "Osaka",
            value: "Osaka",
            key: "0-1-0",
            updateTime: "2022.7.7",
          },
        ],
      },
    ],
  },
  {
    label: "North America",
    value: "North America",
    key: "1",
    updateTime: "2022.7.7",
    children: [
      {
        label: "United States",
        value: "United States",
        key: "1-0",
        updateTime: "2022.7.7",
      },
      {
        label: "Canada",
        value: "Canada",
        key: "1-1",
        updateTime: "2022.7.7",
      },
    ],
  },
  {
    label: "North America",
    value: "North America",
    key: "2",
    updateTime: "2022.7.7",
    children: [
      {
        label: "United States",
        value: "United States",
        key: "2-0",
        updateTime: "2022.7.7",
      },
      {
        label: "Canada",
        value: "Canada",
        key: "2-1",
        updateTime: "2022.7.7",
      },
    ],
  },
  {
    label: "North America",
    value: "North America",
    key: "3",
    updateTime: "2022.7.7",
  },
  {
    label: "North America",
    value: "North America",
    key: "4",
    updateTime: "2022.7.7",
  },
  {
    label: "North America",
    value: "North America",
    key: "5",
    updateTime: "2022.7.7",
  },
  {
    label: "North America",
    value: "North America",
    key: "6",
    updateTime: "2022.7.7",
  },
  {
    label: "North America",
    value: "North America",
    key: "7",
    updateTime: "2022.7.7",
  },
];

/**
 * 云文档 页面
 */
const CloundDocument = () => {
  const router = useRouter();

  return (
    <Row style={{ height: "100%" }}>
      <Col span={6} className={styles.left}>
        <Typography.Title heading={4} className={styles.text}>
          云文档
        </Typography.Title>
        <ScrollBox flex={14}>
          <Tree treeData={treeData} directory />
        </ScrollBox>
      </Col>

      <Col span={18} className={styles.right}>
        <Card
          title="名称"
          style={{ height: "100%" }}
          bodyStyle={{ height: "100%" }}
          headerExtraContent={null}
        >
          <Table
            dataSource={treeData}
            childrenRecordName=""
            scroll={{ scrollToFirstRowOnChange: true, y: 450 }}
          >
            <Table.Column
              title="名称"
              dataIndex="label"
              key="name"
              width="50%"
              render={(text, record, index) => (
                <div>
                  <IconFolder style={{ marginRight: 12 }} />
                  <Typography.Text
                    link
                    onClick={() => router.push(`/clouddocument/${record.key}`)}
                  >
                    {text}
                  </Typography.Text>
                </div>
              )}
            />
            <Table.Column
              title="更新时间"
              width="30%"
              dataIndex="updateTime"
              key="updateTime"
            />
            <Table.Column
              title=""
              key="operate"
              render={() => <Button icon={<IconMore />} />}
            />
          </Table>
        </Card>
      </Col>
    </Row>
  );
};

export default CloundDocument;
