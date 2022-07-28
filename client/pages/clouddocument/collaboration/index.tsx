import {
  Button,
  Card,
  Descriptions,
  List,
  Typography,
} from "@douyinfe/semi-ui";
import dayjs from "dayjs";
import React from "react";
import { useFetchCollaboratorDocument } from "../../../data/document";
import useLocalStorage from "../../../hooks/use-localStorage";

/**
 * 显示共享空间的内容
 */
const DocumentCollaboration = () => {
  const [user, _] = useLocalStorage("user", {} as any);
  const { cdocumentData, isLoading } = useFetchCollaboratorDocument(user.id);
  console.log(cdocumentData);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Card title="共享空间" bodyStyle={{padding: '20px 5%'}}>
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
              <Button block>编辑</Button>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DocumentCollaboration;
