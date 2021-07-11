import { useRef, useState, useEffect, RefObject } from 'react'
import Quill, { QuillOptionsStatic } from 'quill'

const theme = 'bubble'

const modules = {
  toolbar: [['bold'], [{ header: 1 }]],
  clipboard: {
    matchVisual: false
  }
}

const formats = [
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'list',
  'indent',
  'size',
  'header',
  'link',
  'image',
  'video',
  'color',
  'background',
  'clean'
]

function assign(target: any, _varArgs: any) {
  'use strict'
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  var to = Object(target)

  for (var index = 1; index < arguments.length; index++) {
    var nextSource = arguments[index]

    if (nextSource !== null && nextSource !== undefined) {
      for (var nextKey in nextSource) {
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey]
        }
      }
    }
  }
  return to
}

export const useQuill = (options: QuillOptionsStatic | undefined = { theme, modules, formats }) => {
  const quillRef: RefObject<any> = useRef()

  const [isLoaded, setIsLoaded] = useState(false)
  const [obj, setObj] = useState({
    Quill: undefined as any | undefined,
    quillRef,
    quill: undefined as Quill | undefined,
    editorRef: quillRef,
    editor: undefined as Quill | undefined
  })

  useEffect(() => {
    if (!obj.Quill) {
      obj.Quill = require('quill') as Quill
    }
    if (obj.Quill && !obj.quill && quillRef && quillRef.current && isLoaded) {
      const opts = assign(options, {
        modules: assign(modules, options.modules),
        formats: options.formats || formats,
        theme: options.theme || theme
      })
      const quill = new obj.Quill(quillRef.current, opts)

      setObj(assign(assign({}, obj), { quill, editor: quill }))
    }
    setIsLoaded(true)
  }, [obj.Quill])

  return obj
}
