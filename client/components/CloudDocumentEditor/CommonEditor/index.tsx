import { useRouter } from "next/router";
import Quill from "quill";
import React from "react";

import styles from "../editor.module.scss";

/**
 * 这是普通的 Editor
 */
const CommonEditor = () => {
  const { query } = useRouter();
  const QuillRef = React.useRef<Quill>();

  React.useEffect(() => {
    initEditor();
  }, [query.id]);

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
      placeholder: "输入内容......",
      theme: "bubble",
    });
  };

  return <div id="editor" className={styles.editor} />;
};

export default CommonEditor;
