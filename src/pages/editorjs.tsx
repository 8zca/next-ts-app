import React from 'react'
import { Layout } from '@/components/helpers'
import { Editorjs } from '@/components/standalones'

const EditorjsPage: React.FC = () => (
  <Layout title='Editorjs | Next.js + TypeScript Example'>{process.browser && <Editorjs />}</Layout>
)

export default EditorjsPage
