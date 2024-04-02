"use client";

import { useEditor, EditorContent, Mark, markPasteRule } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Image from '@tiptap/extension-image'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'


import { Extension } from "@tiptap/core";
import { RedBox } from "@/app/utils/editor/RedBox";
import Link from "@tiptap/extension-link";

import { LinkPreviewCardNode } from '@/app/utils/editor/node/LinkPreviewCardNode'
import { find } from 'linkifyjs';


const DisableEnter = Extension.create({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        
        // this.editor.commands.insertContent("<br>");

        // if (this.editor.isActive('bulletList')) return false;
        
        // this.editor.chain().createParagraphNear().focus().run();
        // const attr = this.editor.getAttributes('bold');
        // console.log(attr)

        return false; // true 반환 시 엔터 작동하지않음
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
      StarterKit,
      LinkPreviewCardNode,
      Underline, 
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: 'insert-image',
        },
      }),
      Link.extend({
        addPasteRules() {
          return [
              markPasteRule({
                  find: text => {
                    console.log(text)  
                    const foundLinks: any[] = [];
                      if (text) {
                          const links = find(text)?.filter(item => item.isLink);
                          if (links.length) {
                              links.forEach((link, index) => {
                                  
                                  setTimeout(() => {
                                    this.editor.commands.insertContent(`<link-preview-card count="9999" url="${link.value}"></link-preview-card>`);
                                    this.editor.chain().enter().createParagraphNear().focus('end').run();
                                  }, 1000)
                                
                                
                                
                                foundLinks.push({
                                  text: link.value,
                                  data: {
                                      href: link.href,
                                  },
                                  index: link.start,
                                })
                              }
                            );
                          }
                      }

                      return foundLinks;
                  },
                  type: this.type,
                  getAttributes: match => {
                      var _a;
                      return {
                          href: (_a = match.data) === null || _a === void 0 ? void 0 : _a.href,
                      };
                  },
              }),
          ];
      },
      }),
      RedBox,  
      DisableEnter,
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
    content: `
    <p>
      This is still the text editor you’re used to, but enriched with node views.
    </p>
    <link-preview-card count="0"></link-preview-card>
    <p>
      Did you see that? That’s a React component. We are really living in the future.
    </p>
    `
  });

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content}/>
      <EditorContent style={{  }} editor={editor} />
    </div>
  );
};

export default Tiptap;
