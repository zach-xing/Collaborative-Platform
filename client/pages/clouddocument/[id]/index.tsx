import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DocumentLayout from "../../../layout/DocumentLayout";

/**
 * 编辑的文档
 */
const CreateDocument = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <DocumentLayout>
      <EditorContent editor={editor} />
    </DocumentLayout>
  );
};

export default CreateDocument;
