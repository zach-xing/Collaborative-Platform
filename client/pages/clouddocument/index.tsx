import { IconFolder, IconMore, IconFile } from "@douyinfe/semi-icons";
import {
  Button,
  Col,
  Dropdown,
  Form,
  Modal,
  Row,
  Toast,
  Tree,
  Typography,
} from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import CloundDocumentContent from "../../components/CloudDocumentContent";
import ScrollBox from "../../components/ScrollBox";
import { useFetchFile } from "../../data/cloudFile";
import { event, SHOW_FILE_STRUCTURE } from "../../events";
import useLocalStorage from "../../hooks/use-localStorage";

import styles from "./index.module.scss";

/**
 * 云文档 页面
 */
const CloundDocument = () => {
  const router = useRouter();
  const [user, _] = useLocalStorage("user", {} as any);
  const { fileData, isLoading, createFile } = useFetchFile(user.id);
  const [visible, setVisible] = React.useState(false);

  if (isLoading) {
    return <>Loading...</>;
  }

  // 触发选择某个文件夹，并显示到右边部分，或者触发文件直接跳转页面
  const handleSelect = (selectedKey: string, selected: boolean, val: any) => {
    if (val.type === "file") {
      router.push(`/clouddocument/${val.key}`);
    } else {
      console.log(val);
      event.emit(SHOW_FILE_STRUCTURE, val);
    }
  };

  // 在顶层创建文件
  const handleCreateFolder = async (val: any) => {
    try {
      await createFile({
        id: uuidv4(),
        label: val.label,
        type: "folder",
        updateTime: new Date(),
        parentId: "0",
      });
    } catch (err: any) {
      Toast.error(err.message || "创建失败");
      return;
    }
    Toast.success("创建成功");
    setVisible(false);
  };

  // 显示共享空间中的内容
  const handleRoom = async () => {
    router.push("/clouddocument/collaboration");
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col span={6} className={styles.left}>
          <div className={styles.options}>
            <Typography.Title heading={4} className={styles.text}>
              云文档
            </Typography.Title>
            <Dropdown
              trigger={"click"}
              position={"bottomLeft"}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setVisible(true)}>
                    创建顶层文件夹
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleRoom}>共享空间</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Button icon={<IconMore />} />
            </Dropdown>
          </div>
          <ScrollBox flex={14}>
            <Tree
              treeData={fileData}
              onSelect={handleSelect}
              renderFullLabel={({
                className,
                data,
                onClick,
                expandIcon,
              }: any) => {
                const isLeaf = data.type === "file";
                return (
                  <li className={className} key={data.id} onClick={onClick}>
                    {expandIcon}
                    {isLeaf ? <IconFile /> : <IconFolder />}
                    <span style={{ marginLeft: "5px" }}>{data.label}</span>
                  </li>
                );
              }}
            />
          </ScrollBox>
        </Col>

        <Col span={18} className={styles.right}>
          <CloundDocumentContent userId={user.id} />
        </Col>
      </Row>

      <Modal
        title="创建文件夹"
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        footer={null}
      >
        <Form labelPosition="inset" onSubmit={handleCreateFolder}>
          <Form.Input
            field="label"
            label="文件夹名"
            trigger="blur"
            rules={[
              { required: true, message: "必填项" },
              { type: "string", message: "type error" },
            ]}
          />
          <Button
            type="primary"
            block
            style={{ marginBottom: "20px" }}
            htmlType="submit"
          >
            创建此文件夹
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CloundDocument;
