import { Node } from '@tiptap/core';

// RedBox 노드 정의
export const RedBox = Node.create({
    name: 'redBox',
    group: 'inline',
    inline: true,
    draggable: true,
    atom: true,
    attrs: {
      width: {
        default: '35px',
      },
      height: {
        default: '35px',
      },
    },
    parseHTML() {
      return [{ tag: 'div', attrs: { class: 'red-box' } }];
    },
    renderHTML({ HTMLAttributes }) {
      return ['div', { ...HTMLAttributes, style: `width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height}; background-color: red;` }, 0];
    },
  });