import { useRouter } from "next/router";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import React from "react";
import { QuillBinding } from "y-quill";
import { WebrtcProvider } from "y-webrtc";
import * as Y from "yjs";
import singleWebrtcProviderInstance from "../../../utils/webrtc-single-pattern";

import styles from "../editor.module.scss";

/**
 * 协同的 editor
 */
const CollaborateEditor = () => {
  const { query } = useRouter();
  const QuillRef = React.useRef<Quill>();

  React.useEffect(() => {
    const roomId = query.id as string;
    initConnect(roomId);
  }, [query.id]);

  const initConnect = (room: string) => {
    Quill.register("modules/cursors", QuillCursors);
    const ydoc = new Y.Doc();
    // const provider = new WebrtcProvider(room, ydoc);
    const provider = singleWebrtcProviderInstance.inviteWebRtcRoom(room, ydoc);
    const ytext = ydoc.getText("quill");

    QuillRef.current = new Quill(document.querySelector("#editor")!, {
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
      theme: "bubble",
    });

    const binding = new QuillBinding(
      ytext,
      QuillRef.current,
      provider.awareness
    );
  };

  return <div id="editor" className={styles.editor} />;
};

export default CollaborateEditor;
