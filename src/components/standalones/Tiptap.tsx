import React from 'react'
import {
  useEditor,
  EditorContent,
  Editor,
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styled from 'styled-components'
import { Node, mergeAttributes } from '@tiptap/core'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'

const MenuBar: React.FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        h1
      </button>
      <button
        onClick={() =>
          editor.commands.insertContent({
            type: 'foo',
            content: [
              {
                type: 'twoColumn',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'aaaa'
                      }
                    ]
                  }
                ]
              },
              {
                type: 'twoColumn',
                content: [
                  {
                    type: 'paragraph',
                    content: [
                      {
                        type: 'text',
                        text: 'aaaa'
                      }
                    ]
                  }
                ]
              }
            ]
          })
        }
      >
        col
      </button>
      <button
        onClick={
          () =>
            editor.commands.insertContent({
              type: 'table',
              content: [
                {
                  type: 'tableRow',
                  content: [
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: 'aaa'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: 'tableCell',
                      content: [
                        {
                          type: 'paragraph',
                          content: [
                            {
                              type: 'text',
                              text: 'bbb'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            })
          // editor.commands.insertContent('<table><tr><td>aa</td><td>bb</td></tr></table>')
        }
      >
        tbl
      </button>
    </>
  )
}

const Foo = Node.create({
  name: 'foo',
  defaultOptions: {
    HTMLAttributes: {
      class: 'row'
    }
  },
  group: 'block',
  content: 'block+',
  parseHTML() {
    return [{ tag: 'div' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  }
})

const TwoColumn = Node.create({
  name: 'twoColumn',
  defaultOptions: {
    HTMLAttributes: {
      class: 'col'
    }
  },
  group: 'block',

  content: 'block*',

  parseHTML() {
    return [{ tag: 'div' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  }

  // addNodeView() {
  //   return ReactNodeViewRenderer(Component)
  // }
})

const Div = () => (
  <NodeViewWrapper>
    <NodeViewContent />
  </NodeViewWrapper>
)
const Component = () => {
  return (
    <NodeViewWrapper className='col'>
      <NodeViewContent className='' />
    </NodeViewWrapper>
  )
}

const Tiptap: React.FC = () => {
  const editor = useEditor({
    extensions: [StarterKit, TwoColumn, Foo, Table, TableCell, TableRow, TableHeader],
    content: '<p>Hello World! 🌎️</p>'
  })

  return (
    <Wrapper>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className='tiptap' />
    </Wrapper>
  )
}

export default Tiptap

const Wrapper = styled.div`
  margin: 20px;
  .ProseMirror {
    outline: 0;
  }
`

const CustomContent = styled.div`
  display: flex;
  .col {
    width: 50%;
    padding: 24px;
    border: 1px solid #ccc;
  }
`
