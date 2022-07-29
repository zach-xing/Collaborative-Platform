import { IconChevronLeft } from "@douyinfe/semi-icons";
import {
  Button,
  Card,
  Descriptions,
  List,
  Space,
  Typography,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useFetchCollaboratorDocument } from "../../../data/document";
import useLocalStorage from "../../../hooks/use-localStorage";

/**
 * 显示共享空间的内容
 */
const DocumentCollaboration = () => {
  const router = useRouter();
  const [user, _] = useLocalStorage("user", {} as any);
  const { cdocumentData, isLoading } = useFetchCollaboratorDocument(user.id);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Card
      title={
        <Space>
          <Button icon={<IconChevronLeft />} onClick={() => router.back()} />
          共享空间
        </Space>
      }
      bodyStyle={{ padding: "20px 5%" }}
    >
      <List
        grid={{
          gutter: 12,
          span: 6,
        }}
        dataSource={cdocumentData}
        renderItem={(item) => (
          <List.Item>
            <div>
              <Typography.Title heading={3} style={{ marginBottom: "10px" }}>
                {item.title}
              </Typography.Title>

              <Descriptions
                align="left"
                data={[
                  {
                    key: "作者",
                    value: item.ownerName,
                  },
                  {
                    key: "更新日期",
                    value: dayjs(item.updateTime).format("YYYY-MM-DD HH:mm"),
                  },
                ]}
              />
              <Button
                block
                onClick={() =>
                  router.push(`/clouddocument/collaboration/${item.id}`)
                }
              >
                编辑
              </Button>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DocumentCollaboration;
