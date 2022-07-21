import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";

const ydoc = new Y.Doc();

interface IProps {
  hocuspocusProvider: HocuspocusProvider;
}

/**
 * 编辑的文档
 */
const CloudDocument: React.FC<IProps> = (props) => {
  const { hocuspocusProvider } = props;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      Collaboration.configure({
        document: hocuspocusProvider.document,
      }),
      CollaborationCursor.configure({
        provider: hocuspocusProvider,
      }),
    ],
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};

export default CloudDocument;
