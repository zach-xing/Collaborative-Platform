import React from "react";
import CloudDocument from "../../../components/CloudDocument";
import useLocalStorage from "../../../hooks/use-localStorage";

/**
 * 编辑的文档
 */
const CloudDocumentPage = () => {
  const [user, _] = useLocalStorage("user", {} as any);

  return (
    <>
      <CloudDocument />
    </>
  );
};

export default CloudDocumentPage;
