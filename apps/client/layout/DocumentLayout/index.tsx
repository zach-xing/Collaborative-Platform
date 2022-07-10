import { IconChevronLeft } from "@douyinfe/semi-icons";
import { Button, Layout } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import React from "react";

import styles from "./documentLayout.module.scss";

/**
 * 顾名思义，这是显示文档页面的布局
 */
const DocumentLayout: React.FC<{ children: React.ReactNode }> = (props) => {
  const router = useRouter();

  return (
    <Layout className={styles.contain}>
      <Layout.Header className={styles.header}>
        <Button icon={<IconChevronLeft />} onClick={() => router.back()} />
      </Layout.Header>

      <Layout.Content className={styles.main}>{props.children}</Layout.Content>
    </Layout>
  );
};

export default DocumentLayout;
