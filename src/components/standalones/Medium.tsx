import React, { useState } from 'react'
// import Editor from 'react-medium-editor'
import dynamic from 'next/dynamic'

import 'medium-editor/dist/css/medium-editor.css'
import 'medium-editor/dist/css/themes/default.css'

const MediumEditorWrapper = dynamic(() => import('@/utils/mediumEditorWrapper'), { ssr: false })

const Medium: React.FC = () => {
  if (!process.browser) return null
  if (typeof window === 'undefined' || typeof document === 'undefined') return null

  return (
    <div style={{ margin: '10px' }}>
      <MediumEditorWrapper />
    </div>
  )
}

export default Medium
