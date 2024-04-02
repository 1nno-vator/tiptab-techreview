import { NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export default function LinkPreviewCard(props) {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    })
  }

  const onClick = () => {
    console.log(props.node.attrs?.editor)
  }

  return (
    <NodeViewWrapper className="react-component">
      <div>
          {props?.node?.attrs.url ? props?.node?.attrs.url : 'No URL'}
      </div>
    </NodeViewWrapper>
  )
}
