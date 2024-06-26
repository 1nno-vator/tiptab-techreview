"use client";

import React, { useCallback } from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import { createPhoto } from "@/app/api/apis";

type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {

  const handleUploadPhoto = async (files: FileList | null) => {
    if (files === null || !editor) return;

    

    Promise.all([Array.from(files).map(async file => {
      const formData = new FormData();
      formData.append('file', file);
  
      const imgHash = await createPhoto(formData);// 백엔드에게 이미지 Post요청 후 URL 받기
      const IMG_URL = imgHash?.file;
  
      editor.commands.setImage({ src: IMG_URL });
    })]) 


  };

  
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    const selectedText = editor?.getText()

    console.log('selectedText')

    if (selectedText) {
      // update link
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run(); 
    } else {
      editor?.commands.insertContent(url + ' ')
    }

    editor?.commands?.insertContent(`<link-preview-card count="9999" url="${url}"></link-preview-card>`)

      
  }, [editor])
  
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          {/* <Bold className="w-5 h-5" /> */}
          {editor.isActive("bold") ? '볼드해제' : '볼드적용'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          {/* <Italic className="w-5 h-5" /> */}
          {editor.isActive("italic") ? '이탤릭해제' : '이탤릭적용'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          {/* <Underline className="w-5 h-5" /> */}
          {editor.isActive("underline") ? '밑줄해제' : '밑줄적용'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          {editor.isActive("strike") ? '취소선' : '취소선적용'}
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          {/* <Heading2 className="w-5 h-5" /> */}
          {editor.isActive("heading", { level: 2 }) ? '본문으로' : '소제목으로'}
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          {/* <List className="w-5 h-5" /> */}
          {editor.isActive("bulletList") ? '불릿해제' : '불릿적용'}
        </button>

      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
        setLink
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
      >
        unsetLink
      </button>

      <input 
        type='file' 
        accept="image/*" 
        multiple
        onChange={(e) => {
          handleUploadPhoto(e.target.files);
          e.target.value = ''; // 중복해서 데이터 넣을 경우 가능 예외 처리 
        }}
      />
        
      </div>
      
        <button
          type="submit"
          className="px-4 bg-sky-700 text-white py-2 rounded-md"
          disabled={!content}
        >
          Add
        </button>
      
    </div>
  );
};

export default Toolbar;


const UNUSED = `
<button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <ListOrdered className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Quote className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("codeblock")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400"
          }
        >
          <Code className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-400 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className="w-5 h-5" />
        </button>
        `