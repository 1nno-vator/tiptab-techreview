"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from '@tiptap/extension-image'
import HardBreak from "@tiptap/extension-hard-break";

import { Extension } from "@tiptap/core";

const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        
        if (this.editor.isActive('bulletList')) return false;
        
        this.editor.chain().selectParentNode().createParagraphNear().focus().run();
        return true;
      },
    };
  },
});

const Tiptap = ({ onChange, content }: any) => {
  
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }), 
      Underline, 
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: 'insert-image',
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      HardBreak.extend({
        // addKeyboardShortcuts () {
        //   return {
        //     Enter: () => this.editor.commands.setHardBreak()
        //   }
        // }
        HTMLAttributes: {
          class: 'hard-break-br',
        },
      }), 
      DisableEnter
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
