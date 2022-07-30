import { Toast } from "@douyinfe/semi-ui";
import { useRouter } from "next/router";
import Quill from "quill";
import React from "react";
import { event, SAVE_FILE_CONTENT } from "../../../events";
import { IDocument } from "../../../types";

import styles from "../editor.module.scss";

interface IProps {
  data: IDocument;
  saveDocument: (id: string, text: string) => Promise<any>;
}

/**
 * 这是普通的 Editor
 */
const CommonEditor: React.FC<IProps> = ({ data, saveDocument }) => {
  const { query } = useRouter();
  const QuillRef = React.useRef<Quill>();

  React.useEffect(() => {
    initEditor();
    event.on(SAVE_FILE_CONTENT, handleSave);
    return () => {
      event.off(SAVE_FILE_CONTENT, handleSave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleSave = async () => {
    try {
      await saveDocument(
        query.id as string,
        JSON.stringify(QuillRef.current!.getContents())
      );
    } catch (error: any) {
      Toast.error(error.message || "保存失败");
      return;
    }
    Toast.success("保存成功");
  };

  const initEditor = () => {
    QuillRef.current = new Quill(document.querySelector("#editor")!, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
        history: {
          userOnly: true,
        },
      },
      theme: "bubble",
    });
    // 这是获取这个文档的初始数据
    QuillRef.current!.setContents(JSON.parse(data.text));
  };

  return <div id="editor" className={styles.editor} />;
};

export default CommonEditor;
