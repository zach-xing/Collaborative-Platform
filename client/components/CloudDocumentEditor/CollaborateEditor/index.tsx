import { useRouter } from "next/router";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import React from "react";
import { Modal, Notification, Toast } from "@douyinfe/semi-ui";
import { io, Socket } from "socket.io-client";
import { QuillBinding } from "y-quill";
import { event, SAVE_FILE_CONTENT } from "../../../events";
import { IDocument, IUser } from "../../../types";
import singleWebrtcProviderInstance from "../../../utils/webrtc-single-pattern";

import styles from "../editor.module.scss";

interface IProps {
  data: IDocument;
  saveDocument: (id: string, text: string) => Promise<any>;
  user: IUser;
  fetchDocumentVersion: () => Promise<any>;
}

/**
 * 协同的 editor
 */
const CollaborateEditor: React.FC<IProps> = ({
  data,
  saveDocument,
  user,
  fetchDocumentVersion,
}) => {
  const { query } = useRouter();
  const onlineSocketRef = React.useRef<Socket | null>(null);
  const QuillRef = React.useRef<Quill>();

  // 这个 useEffect 和监听在线用户相关
  React.useEffect(() => {
    const socket = io("ws://127.0.0.1:8888", { path: "/online" });
    socket.on("noticeEnter", handleNoticeEnter);
    socket.on("noticeLeave", handleNoticeLeave);
    onlineSocketRef.current = socket;
    return () => {
      socket.emit("leave", {
        // 某用户退出后并通知服务端
        uid: user.id,
        uName: user.name,
        did: data.id,
      });
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // 进入的时候通知服务端，并广播给其他用户
    onlineSocketRef.current?.emit(
      "enter",
      { uid: user.id, did: data.id, uName: user.name },
      (res: any) => {
        const roomId = query.id as string;
        initConnect(roomId, res.length === 1); // 这里若长度大于 1，则表示除自己外，文档已经有人在线了
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, query.id]);

  // 处理文档的保存
  React.useEffect(() => {
    event.on(SAVE_FILE_CONTENT, handleSave);
    return () => {
      event.off(SAVE_FILE_CONTENT, handleSave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const handleNoticeEnter = (enterData: any) => {
    if (enterData.did === data.id) {
      console.log("enter", enterData);
      Notification.open({
        title: `用户 ${enterData.uName} 进入文档`,
        duration: 3,
      });
    }
  };

  // 处理 notice leave
  const handleNoticeLeave = (leaveData: any) => {
    if (leaveData.did === data.id) {
      console.log("leave", leaveData);
      Notification.open({
        title: `用户 ${leaveData.uName} 离开文档`,
        duration: 3,
      });
    }
  };

  // 处理文档的保存
  const handleSave = async () => {
    const version = await fetchDocumentVersion();
    console.log(version, data.version);
    try {
      if (version === data.version) {
        saveDocument(
          query.id as string,
          JSON.stringify(QuillRef.current!.getContents())
        );
        Toast.success("保存成功");
      } else {
        Modal.error({
          title: "检测到有更新版本",
          content: "若提交保存，则可能直接覆盖其他人的提交",
          onOk: async () => {
            await saveDocument(
              query.id as string,
              JSON.stringify(QuillRef.current!.getContents())
            );
            Toast.success("保存成功");
          },
        });
      }
    } catch (error: any) {
      Toast.error(error.message || "保存错误");
    }
  };

  return <div id="editor" className={styles.editor} />;
};

export default CollaborateEditor;
