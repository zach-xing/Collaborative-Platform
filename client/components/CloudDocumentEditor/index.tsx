import React from "react";
import { useRouter } from "next/router";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";

/**
 * 编辑的文档
 */
const CloudDocumentEditor = () => {
  const { query } = useRouter();

  React.useEffect(() => {
    const roomId = query.id as string;
    initConnect(roomId);
  }, [query.id]);

  const initConnect = (room: string) => {
    Quill.register("modules/cursors", QuillCursors);
    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider(room, ydoc);
    const ytext = ydoc.getText("quill");

    const editor = new Quill(document.querySelector("#editor")!, {
      modules: {
        cursors: true,
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
        history: {
          userOnly: true,
        },
      },
      placeholder: "Start collaborating...",
      theme: "bubble", // or 'bubble'
    });

    const binding = new QuillBinding(ytext, editor, provider.awareness);
  };

  return (
    <>
      <div id="editor" style={{ minHeight: "200px" }}></div>
    </>
  );
};

export default CloudDocumentEditor;
