import '@draft-js-plugins/inline-toolbar/lib/plugin.css'

import styled from 'styled-components'
import Draft, { EditorState, AtomicBlockUtils, EditorBlock } from 'draft-js'
import { BoldButton, createBlockStyleButton } from '@draft-js-plugins/buttons'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar'
import createLinkPlugin from '@draft-js-plugins/anchor'
import React, { useRef, useState } from 'react'
import Immutable from 'immutable'

const linkPlugin = createLinkPlugin({
  placeholder: 'http://…'
})
const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin
const plugins = [inlineToolbarPlugin, linkPlugin]
const text = 'Try selecting a part of this text and click on the link button in the toolbar that appears …'
const TitleButton = createBlockStyleButton({ blockType: 'header-two', children: 'T' })

const MyCustomBlock: React.FC = ({ children }) => {
  return (
    <div className='MyCustomBlock'>
      {/* here, this.props.children contains a <section> container, as that was the matching element */}
      {children}
    </div>
  )
}

const blockRenderMap = Immutable.Map({
  MyCustomBlock: {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'section',
    wrapper: <MyCustomBlock />
  }
})

const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(blockRenderMap)

const Draftjs = () => {
  const [editorState, setEditorState] = useState(() => createEditorStateWithText(text))

  if (!process.browser) return null

  const editor = useRef<Editor | null>(null)

  const onChange = (value: EditorState) => {
    setEditorState(value)
  }

  const focus = () => {
    editor.current?.focus()
  }

  const insertBlock = () => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('TEST', 'MUTABLE', { a: 'b' })

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    })

    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '))
  }

  return (
    <Wrapper onClick={focus}>
      <button onClick={insertBlock}>Insert Block</button>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => {
          editor.current = element
        }}
        blockRendererFn={blockRenderer}
      />
      <InlineToolbar>
        {
          // may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (
            <div>
              <TitleButton {...externalProps} />
              <BoldButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
            </div>
          )
        }
      </InlineToolbar>
    </Wrapper>
  )
}

const blockRenderer = (contentBlock: any) => {
  const type = contentBlock.getType()

  if (type === 'atomic') {
    return {
      component: BlockComponent,
      editable: true,
      props: {
        foo: 'bar'
      }
    }
  }
}

const BlockComponent = (props: any) => {
  return (
    <div style={{ border: '1px solid #f00' }}>
      <EditorBlock {...props} />
    </div>
  )
}

export default Draftjs

const Wrapper = styled.div`
  margin: 20px;
  line-height: 2;
`
