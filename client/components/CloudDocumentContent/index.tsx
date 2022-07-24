import { IconFile, IconFolder, IconMore } from "@douyinfe/semi-icons";
import { Card, Table, Typography, Button } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import React from "react";
import { useFetchFile } from "../../data/cloudDocument";
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
  const [fileData, setFileData] = React.useState<ICloudFile>();

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

  return (
    <Card
      title={fileData?.label || "文件列表"}
      style={{ height: "100%" }}
      bodyStyle={{ height: "100%" }}
      headerExtraContent={null}
    >
      <Table
        dataSource={fileData?.children}
        childrenRecordName=""
        scroll={{ scrollToFirstRowOnChange: true, y: 450 }}
      >
        <Table.Column
          title="名称"
          dataIndex="label"
          key="name"
          width="80%"
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
          title=""
          key="operate"
          render={() => <Button icon={<IconMore />} />}
        />
      </Table>
    </Card>
  );
};

export default CloundDocumentContent;
