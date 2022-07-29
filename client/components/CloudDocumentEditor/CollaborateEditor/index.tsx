import { useRouter } from "next/router";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import React from "react";
import { io } from "socket.io-client";
import { QuillBinding } from "y-quill";
import { IDocument } from "../../../types";
import singleWebrtcProviderInstance from "../../../utils/webrtc-single-pattern";

import styles from "../editor.module.scss";

interface IProps {
  data: IDocument;
  saveDocument: (id: string, text: string) => Promise<any>;
}

/**
 * 协同的 editor
 */
const CollaborateEditor: React.FC<IProps> = ({ data, saveDocument }) => {
  const { query } = useRouter();
  const onlineSocketRef = React.useRef<any>(
    io("ws://127.0.0.1:8888", { path: "/online" })
  );
  const QuillRef = React.useRef<Quill>();

  // 这个 useEffect 和监听在线用户相关
  React.useEffect(() => {
    onlineSocketRef.current.on("noticeEnter", () => {});
  }, []);

  React.useEffect(() => {
    onlineSocketRef.current.emit("enter", { uid: data.ownerId, did: data.id }, (res: any) => {
      console.log(res)
    });
    const roomId = query.id as string;
    initConnect(roomId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query.id]);

  const initConnect = (room: string) => {
    Quill.register("modules/cursors", QuillCursors);

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

    const provider = singleWebrtcProviderInstance.inviteWebRtcRoom(room);
    const ydoc = singleWebrtcProviderInstance.getYDoc();
    const ytext = ydoc.getText("quill");

    const binding = new QuillBinding(
      ytext,
      QuillRef.current,
      provider.awareness
    );

    // 设置这个文档的初始值（也就是数据库中的数据）
    QuillRef.current!.setContents(JSON.parse(data.text));
  };

  return <div id="editor" className={styles.editor} />;
};

export default CollaborateEditor;
