import '@draft-js-plugins/inline-toolbar/lib/plugin.css'

import { EditorState } from 'draft-js'
import { BoldButton, ItalicButton, UnderlineButton } from '@draft-js-plugins/buttons'
import Editor, { createEditorStateWithText } from '@draft-js-plugins/editor'
import createInlineToolbarPlugin from '@draft-js-plugins/inline-toolbar'
import createLinkPlugin from '@draft-js-plugins/anchor'
import React, { useRef, useState } from 'react'

const linkPlugin = createLinkPlugin({
  placeholder: 'http://…'
})
const inlineToolbarPlugin = createInlineToolbarPlugin()
const { InlineToolbar } = inlineToolbarPlugin
const plugins = [inlineToolbarPlugin, linkPlugin]
const text = 'Try selecting a part of this text and click on the link button in the toolbar that appears …'

const Draftjs = () => {
  const [editorState, setEditorState] = useState(() => createEditorStateWithText(text))

  if (!process.browser) return null
  // useEffect(() => {
  //   // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
  //   setEditorState(createEditorStateWithText(text))
  // }, [])

  const editor = useRef<Editor | null>(null)

  const onChange = (value: EditorState): void => {
    setEditorState(value)
  }

  const focus = (): void => {
    editor.current?.focus()
  }

  return (
    <div onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => {
          editor.current = element
        }}
      />
      <InlineToolbar>
        {
          // may be use React.Fragment instead of div to improve perfomance after React 16
          (externalProps) => (
            <div>
              <BoldButton {...externalProps} />
              <ItalicButton {...externalProps} />
              <UnderlineButton {...externalProps} />
              <linkPlugin.LinkButton {...externalProps} />
            </div>
          )
        }
      </InlineToolbar>
    </div>
  )
}

export default Draftjs
