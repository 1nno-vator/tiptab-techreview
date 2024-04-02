import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import LinkPreviewCard from './renderer/LinkPreviewCard'

export const LinkPreviewCardNode = Node.create({
  name: 'linkPreviewCard',
  group: 'block',
  // atom: true,
  addAttributes() {
    return {
      editor: this.editor,
      count: {
        default: 0,
      },
      url: {
        default: ''
      }
    }
  },
  parseHTML() {
    return [
      {
        tag: 'link-preview-card',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['link-preview-card', mergeAttributes(HTMLAttributes)]
  },
  addNodeView() {
    return ReactNodeViewRenderer(LinkPreviewCard)
  },
})
