import React, { useEffect } from 'react'
import MediumEditor, { MediumEditor as EditorType } from 'medium-editor'

type Props = {
  data?: any
}

const MediumEditorWrapper: React.FC<Props> = ({ data }) => {
  let editor: EditorType
  useEffect(() => {
    editor = new MediumEditor('.js-editable', {
      targetBlank: true,
      toolbar: {
        buttons: [
          {
            name: 'h2',
            contentDefault: 'T'
          },
          'bold',
          {
            name: 'anchor',
            contentDefault: 'Link'
          }
        ]
      }
    })

    return () => {
      editor.destroy()
    }
  }, [])

  return (
    <div>
      <div className='js-editable' dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  )
}

export default MediumEditorWrapper
