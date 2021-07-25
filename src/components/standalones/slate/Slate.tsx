import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Slate, Editable, ReactEditor, withReact, useSlate } from 'slate-react'
import { Editor, Transforms, Text, createEditor, Element, Descendant, Range } from 'slate'
import { Button, Icon, Menu, Portal } from './components'
import { css } from '@emotion/css'

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text:
          'This example shows how you can make a hovering menu appear above your content, which you can use to make text ',
      },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', or anything else you might want to do!' }
    ]
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try it out yourself! Just ' },
      { text: 'select any piece of text and the menu will appear', bold: true },
      { text: '.' }
    ]
  }
]

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const StateEditor = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue)
  const editor = useMemo(() => withReact(createEditor()), [])

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <HoveringToolbar />
      <Editable
        renderLeaf={(props) => <Leaf {...props} />}
        placeholder='Enter some text...'
        onDOMBeforeInput={(event: InputEvent) => {
          event.preventDefault()
          console.log(event)

          switch (event.inputType) {
            case 'formatBold':
              return toggleFormat(editor, 'bold')
            case 'formatItalic':
              return toggleFormat(editor, 'italic')
            case 'formatUnderline':
              return toggleFormat(editor, 'underlined')
          }
        }}
      />
    </Slate>
  )
}

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement>()
  const editor = useSlate()

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection()
    const domRange = domSelection!.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    el.style.opacity = '1'
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`
  })
  console.log(11)
  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          // top: -10000px;
          // left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <FormatButton format='bold' icon='format_bold' />
        <FormatButton format='italic' icon='format_italic' />
        <FormatButton format='underlined' icon='format_underlined' />
      </Menu>
    </Portal>
  )
}

const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: 'all'
  })
  return !!match
}

const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(editor, { [format]: isActive ? null : true }, { match: Text.isText, split: true })
}

const FormatButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleFormat(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

export default StateEditor
