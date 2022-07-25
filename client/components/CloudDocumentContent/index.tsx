import {
  IconDelete,
  IconFile,
  IconFolder,
} from "@douyinfe/semi-icons";
import {
  Card,
  Table,
  Typography,
  Button,
  Modal,
  Form,
  Toast,
  Space,
  Popconfirm,
  Empty,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useFetchFile } from "../../data/cloudFile";
import { event, SHOW_FILE_STRUCTURE } from "../../events";
import { ICloudFile } from "../../types";

interface IProps {
  userId: string;
}

/**
 * 在 CloundDocument 页面显示文件列表
 */
const CloundDocumentContent: React.FC<IProps> = (props) => {
  const router = useRouter();
  const { createFile, deleteFile } = useFetchFile(props.userId);
  const [fileData, setFileData] = React.useState<ICloudFile>();
  const [visible, setVisible] = React.useState<"file" | "folder" | "">(""); // '' 表示不打开 Modal

  React.useEffect(() => {
    event.on(SHOW_FILE_STRUCTURE, (val: ICloudFile) => {
      setFileData(val);
    });
    return () => {
      event.off(SHOW_FILE_STRUCTURE);
    };
  }, []);

  // 当点击到类型为 file 时，就跳转到 editor 页面中去
  const handleClick = (record: ICloudFile) => {
    if (record.type === "file") {
      router.push(`/clouddocument/${record.key}`);
    } else {
      setFileData(record);
    }
  };

  // 创建文件或文件夹
  const handleCreate = async (val: any) => {
    if (visible === "" || !fileData) return;
    try {
      await createFile({
        id: uuidv4(),
        label: val.label,
        type: visible,
        updateTime: new Date(),
        parentId: fileData.id,
      });
    } catch (err: any) {
      Toast.error(err.message || "创建失败");
      return;
    }
    Toast.success("创建成功");
    setVisible("");
    event.emit(SHOW_FILE_STRUCTURE, {});
  };

  // 处理删除文件[夹]
  const handleDelete = async (id: string) => {
    if (!fileData) return;
    try {
      await deleteFile({
        id: id,
      });
    } catch (err: any) {
      Toast.error(err.message || "删除失败");
    }
    Toast.success("删除成功");
    setVisible("");
    event.emit(SHOW_FILE_STRUCTURE, {});
  };

  return (
    <>
      <Card
        title={fileData?.label || "文件列表"}
        style={{ height: "100%" }}
        bodyStyle={{ height: "100%" }}
        headerExtraContent={
          fileData?.children ? (
            <Space>
              <Button onClick={() => setVisible("file")}>创建文件</Button>
              <Button onClick={() => setVisible("folder")}>创建文件夹</Button>
              <Popconfirm
                title="确定是否要删除此文件夹？"
                content="此修改将不可逆"
                onConfirm={() => handleDelete(fileData.id)}
              >
                <Button type="danger">删除此文件夹</Button>
              </Popconfirm>
            </Space>
          ) : null
        }
      >
        {fileData?.children ? (
          <Table
            dataSource={fileData?.children}
            childrenRecordName=""
            scroll={{ scrollToFirstRowOnChange: true, y: 450 }}
          >
            <Table.Column
              title="名称"
              dataIndex="label"
              key="name"
              width="60%"
              defaultSortOrder={"ascend"}
              sorter={(a, b) => (a.type < b.type ? 1 : -1)}
              render={(text, record: ICloudFile, index) => (
                <div>
                  {record.type === "file" ? <IconFile /> : <IconFolder />}
                  <Typography.Text
                    style={{ marginLeft: 12 }}
                    link
                    onClick={() => handleClick(record)}
                  >
                    {record.label}
                  </Typography.Text>
                </div>
              )}
            />
            <Table.Column
              title="最近更改时间"
              dataIndex="updateTime"
              key="updateTime"
              width="20%"
              render={(text) => (
                <div>{dayjs(text).format("YYYY-MM-DD HH:mm")}</div>
              )}
            />
            <Table.Column
              title=""
              key="operate"
              render={(_, record) => (
                <Popconfirm
                  title="确定是否要删除此文件/文件夹？"
                  content="此修改将不可逆"
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button type="danger" icon={<IconDelete />} />
                </Popconfirm>
              )}
            />
          </Table>
        ) : (
          <Empty
            title={"点击左方文件"}
            description="点击左方文件即可显示详情"
          />
        )}
      </Card>

      <Modal
        title={visible === "file" ? "创建文件" : "创建文件夹"}
        visible={visible !== ""}
        onCancel={() => setVisible("")}
        closeOnEsc={true}
        footer={null}
      >
        <Form labelPosition="inset" onSubmit={handleCreate}>
          <Form.Input
            field="label"
            label={visible === "file" ? "文件名" : "文件夹名"}
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
            {visible === "file" ? "创建文件" : "创建文件夹"}
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CloundDocumentContent;
