export class Target {
  constructor(target) {
    this.target = target
  }

  select() {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(this.target)
    selection.removeAllRanges()
    selection.addRange(range)
  }
}
