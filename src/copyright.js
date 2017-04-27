import isElement from 'lodash.iselement'
import isFunction from 'lodash.isfunction'
import isPlainObject from 'lodash.isplainobject'

const defaults = {
  text: '<br><br>Original: ' + window.location.href,
  minlength: 0,
  processing: undefined
}

const winSel = window.getSelection
const docSel = document.selection
const body = document.body

export default class Copyright {
  constructor(element, options) {
    if (!isElement(element)) {
      throw new Error('element parameter is not a DOM element')
    }

    if (!isPlainObject(options)) {
      throw new Error('options parameter is not a object')
    }

    this.element = element
    this.options = Object.assign({}, defaults, options)
    this.event = {}
    const eventTypes = ['beforeCopy', 'afterCopy']
    eventTypes.forEach(eventType => {
      this.event[eventType] = []
    })

    this.trigger = type => {
      this.event[type].forEach(event => {
        event()
      })
    }

    this.copy = () => {
      let selectedText = this.getSelectedText()
      const range = this.saveSelectionRange(body[0])

      if (selectedText.length > this.options.minlength) {
        if (isFunction(this.options.processing)) {
          this.options.processing(selectedText)
        }
        selectedText += this.options.text
      }

      const div = document.createElement('div')
      div.innerHTML = selectedText
      div.setAttribute('style', 'width: 1px; height: 1px; overflow: hidden; position: absolute; top: -99999px; left: -99999px; opacity: 0.01')

      body.appendChild(div)

      this.setSelectionRange.call({
        div
      })

      window.setTimeout(() => {
        this.restoreSelectionRange.call({
          range
        })
        body.removeChild(div)
        this.trigger('afterCopy')
      }, 0)

      this.trigger('beforeCopy')
    }

    this.start()
  }

  getSelectedText() {
    if (winSel) {
      return winSel().toString()
    } else if (docSel) {
      return docSel.createRange().text()
    }
  }

  setSelectionRange() {
    if (winSel) {
      const range = document.createRange()
      range.selectNodeContents(this.div)
      const selection = winSel()
      selection.removeAllRanges()
      selection.addRange(range)
    } else if (docSel && document.body.createTextRange) {
      const textRange = document.body.createTextRange()
      textRange.moveToElementText(this.div)
      textRange.select()
    }
  }

  removeSelectionRange() {
    if (winSel) {
      winSel().removeAllRanges()
    } else if (docSel) {
      docSel.empty()
    }
  }

  saveSelectionRange() {
    if (winSel) {
      const selection = winSel()
      if (selection.getRangeAt && selection.rangeCount) {
        return selection.getRangeAt(0)
      }
    } else if (docSel) {
      return docSel.createRange()
    }

    return null
  }

  restoreSelectionRange() {
    if (this.range) {
      if (winSel) {
        const sel = winSel()
        sel.removeAllRanges()
        sel.addRange(this.range)
      } else if (docSel) {
        this.range.select()
      }
    } else {
      this.removeSelectionRange()
    }
  }

  on(type, callback) {
    if (type !== 'beforeCopy' && type !== 'afterCopy') {
      throw new Error(`event name must be 'beforeCopy' or 'afterCopy'`)
    }

    if (isFunction(callback)) {
      this.event[type].push(callback)
    }

    return this
  }

  destory() {
    this.element.removeEventListener('copy', this.copy, false)
  }

  start() {
    this.element.addEventListener('copy', this.copy, false)
    return this
  }
}
