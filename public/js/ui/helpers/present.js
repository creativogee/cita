export class Dom {
  constructor() {}
  /**
   *
   * @param {object} elem element object
   * @returns object | null
   */
  show(elem) {
    this.elem = elem;
    this.elem.classList.remove('invisible');
    return this;
  }

  /**
   * hides element after specified delay
   * @param {*} ms time in miliseconds
   * @returns void
   */
  hide(ms) {
    if (ms) {
      return setTimeout(() => {
        this.elem.classList.add('invisible');
      }, ms);
    }
  }
}
