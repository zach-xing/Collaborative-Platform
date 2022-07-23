import React from "react";
import CloudDocumentEditor from "../../../components/CloudDocumentEditor";
import useLocalStorage from "../../../hooks/use-localStorage";

/**
 * 编辑的文档
 */
const CloudDocumentPage = () => {
  const [user, _] = useLocalStorage("user", {} as any);

  return (
    <>
      <CloudDocumentEditor />
    </>
  );
};

export default CloudDocumentPage;
