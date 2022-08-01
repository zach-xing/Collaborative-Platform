import React from "react";
import {
  Avatar,
  AvatarGroup,
  Button,
  Form,
  List,
  Modal,
  Select,
  Space,
  Toast,
  Typography,
} from "@douyinfe/semi-ui";
import { IconChevronLeft } from "@douyinfe/semi-icons";
import { useRouter } from "next/router";
import { event, SAVE_FILE_CONTENT } from "../../events";
import CommonEditor from "./CommonEditor";
import CollaborateEditor from "./CollaborateEditor";
import { useFetchDocument } from "../../data/document";
import { useFetchFriends } from "../../data/friend";
import { addCollaborator } from "../../data/collaborator";
import useLocalStorage from "../../hooks/use-localStorage";

import styles from "./editor.module.scss";

/**
 * 编辑的文档
 */
const CloudDocumentEditor = () => {
  const router = useRouter();
  const [user, _] = useLocalStorage("user", {} as any);
  const { documentData, isLoading, saveDocument, fetchDocumentVersion } =
    useFetchDocument(router.query.id as string);
  const { friendList, refetch } = useFetchFriends(user.id);
  const [visible, setVisible] = React.useState(false);

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

  // 打开Modal，并获取 friend 信息
  const handleOpenModal = () => {
    refetch();
    setVisible(true);
  };

  // 发送给邀请
  const handleInvite = async (val: any) => {
    try {
      await addCollaborator({
        id: documentData?.id!,
        userIds: val.userIds.join(),
      });
      router.push("/clouddocument");
    } catch (error: any) {
      Toast.error(error.message || "邀请失败");
    }
    Toast.success("邀请成功");
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
          <div onClick={handleOpenModal}>
            <AvatarGroup maxCount={2} size="small">
              <Avatar color="blue" alt={user.name}>
                {user.name[0]}
              </Avatar>
              {documentData?.collaboratorArr?.map((item) => (
                <Avatar key={item.id} color="blue" alt={item.name}>
                  {item.name[0]}
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        </Space>
      </div>
      <div className={styles.container}>
        {documentData?.collaborators !== "" ? (
          <CollaborateEditor
            data={documentData!}
            saveDocument={saveDocument}
            user={user}
            fetchDocumentVersion={fetchDocumentVersion}
          />
        ) : (
          <CommonEditor data={documentData!} saveDocument={saveDocument} />
        )}
      </div>

      <Modal
        title="管理协作者"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        closeOnEsc={true}
      >
        <Form onSubmit={handleInvite}>
          <Form.Select
            label="邀请协作者"
            field="userIds"
            filter
            multiple
            placeholder="在好友中搜索..."
            autoClearSearchValue={true}
            rules={[{ required: true, message: "若邀请其他用户必需填写此项" }]}
            style={{ width: "100%" }}
          >
            {friendList?.map((friend) => (
              <Select.Option value={friend.id} key={friend.id}>
                {friend.name}
              </Select.Option>
            ))}
          </Form.Select>

          <List
            header={<div>协作者</div>}
            bordered
            dataSource={documentData?.collaboratorArr}
            style={{ margin: "20px 0" }}
            renderItem={(item) => (
              <List.Item
                header={
                  <Avatar color="blue" size="small">
                    {item.name[0]}
                  </Avatar>
                }
              >
                {item.name}
              </List.Item>
            )}
          />

          <Button block style={{ marginBottom: "20px" }} htmlType="submit">
            邀请
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CloudDocumentEditor;
