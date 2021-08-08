import React from 'react'
import Image from '@/utils/image'
import Title from '@/utils/title'
import Bold from '@/utils/bold'
import dynamic from 'next/dynamic'

const EditorComponent = dynamic(import('react-editor-js'), { ssr: false })

export const EDITOR_JS_TOOLS = {
  header: Title,
  bold: Bold,
  image: {
    class: Image
  }
}

const Editorjs: React.FC = () => {
  if (!process.browser) return null

  return <EditorComponent tools={EDITOR_JS_TOOLS} inlineToolbar={['header', 'bold', 'link']} />
}

export default Editorjs
