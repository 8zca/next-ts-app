import React from 'react'
import { useQuill } from '@/utils/quill'
import styled from 'styled-components'

import 'quill/dist/quill.bubble.css'

const Quill: React.FC = () => {
  const { quill, quillRef } = useQuill()

  return (
    <div style={{ width: 500, height: '400px' }}>
      <TextArea ref={quillRef} style={{ border: '1px solid #ccc' }} />
    </div>
  )
}

export default Quill

const TextArea = styled.div`
  margin: 32px;
  border: 1px solid ${(props) => props.theme.colors.primary.light};
`
