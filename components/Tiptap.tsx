"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const Tiptap = ({ onChange, content }: any) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };
  const editor = useEditor({
    extensions: [StarterKit, Underline, Link.configure({
      openOnClick: false,
      autolink: true,
    }),
    ],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 border-b border-r border-l border-gray-700 text-gray-900 pt-4 rounded-bl-md rounded-br-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{  }} editor={editor} />
    </div>
  );
};

export default Tiptap;
