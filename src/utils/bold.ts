class Mark {
  private _state: any
  button: any
  api: any
  tag: string
  class: string

  static get isInline() {
    return true
  }

  get state() {
    return this._state
  }

  set state(state) {
    this._state = state

    this.button.classList.toggle(this.api.styles.inlineToolButtonActive, state)
  }

  constructor({ api }: any) {
    this.api = api
    this.button = null
    this._state = false

    this.tag = 'STRONG'
    this.class = 'cdx-h2'
  }

  render() {
    this.button = document.createElement('button')
    this.button.type = 'button'
    this.button.innerHTML = 'B'
    this.button.classList.add(this.api.styles.inlineToolButton)

    return this.button
  }

  surround(range: any) {
    if (this.state) {
      this.unwrap(range)
      return
    }

    this.wrap(range)
  }

  wrap(range: any) {
    const selectedText = range.extractContents()
    const mark = document.createElement(this.tag)

    mark.classList.add(this.class)
    mark.appendChild(selectedText)
    range.insertNode(mark)

    this.api.selection.expandToTag(mark)
  }

  unwrap(range: any) {
    const mark = this.api.selection.findParentTag(this.tag, this.class)
    const text = range.extractContents()

    mark.remove()

    range.insertNode(text)
  }

  checkState() {
    const mark = this.api.selection.findParentTag(this.tag)

    this.state = !!mark
  }
}

export default Mark
