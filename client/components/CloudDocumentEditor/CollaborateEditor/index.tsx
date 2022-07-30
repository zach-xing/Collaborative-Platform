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
  userId: string;
}

/**
 * 协同的 editor
 */
const CollaborateEditor: React.FC<IProps> = ({
  data,
  saveDocument,
  userId,
}) => {
  const { query } = useRouter();
  const onlineSocketRef = React.useRef<any>(
    io("ws://127.0.0.1:8888", { path: "/online" })
  );
  const QuillRef = React.useRef<Quill>();

  // 这个 useEffect 和监听在线用户相关
  React.useEffect(() => {
    onlineSocketRef.current.on("noticeEnter", handleNoticeEnter);
    onlineSocketRef.current.on("noticeLeave", handleNoticeLeave);
    return () => {
      onlineSocketRef.current.emit("leave", { // 某用户退出后并通知服务端
        uid: userId,
        did: data.id,
      });
      onlineSocketRef.current.off("noticeEnter", handleNoticeEnter);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      onlineSocketRef.current.off("noticeLeave", handleNoticeLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // 进入的时候通知服务端，并广播给其他用户
    onlineSocketRef.current.emit(
      "enter",
      { uid: userId, did: data.id },
      (res: any) => {
        const roomId = query.id as string;
        initConnect(roomId, res.length === 1); // 这里若长度大于 1，则表示除自己外，文档已经有人在线了
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query.id]);

  const initConnect = (room: string, isGetInitData: boolean) => {
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
    if (isGetInitData) {
      console.log("载入初始数据，数据库中的数据");
      QuillRef.current!.setContents(JSON.parse(data.text));
    }
  };

  // 处理 notice enter
  const handleNoticeEnter = () => {};

  // 处理 notice leave
  const handleNoticeLeave = () => {};

  return <div id="editor" className={styles.editor} />;
};

export default CollaborateEditor;
