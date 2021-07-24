import React from 'react'
import EditorJs from 'react-editor-js'
import Mark from '@/utils/mark'
import '@editorjs/editorjs/'

export const EDITOR_JS_TOOLS = {
  mark: {
    class: Mark
  }
}

const Editorjs: React.FC = () => {
  if (!process.browser) return null
  if (typeof window === 'undefined') return null

  return <EditorJs tools={EDITOR_JS_TOOLS} />
}

export default Editorjs
