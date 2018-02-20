export const dom = {
  /**
   *
   * @param {object} elem element object
   * @returns object | null
   */
  show(elem) {
    return {
      /**
       * Shows an element
       * @param {*} ms time in miliseconds
       * @returns void
       */
      after: ms => {
        if (ms) {
          return setTimeout(() => {
            elem.classList.remove("invisible")
          }, ms)
        }
      },

      default: elem.classList.remove("invisible"),
    }
  },
  /**
   * Hides an element
   * @param {object} elem element object
   * @returns object | null
   */
  hide(elem) {
    return {
      /**
       * Provides a delay on the hide action
       * @param {*} ms time in miliseconds
       * @returns void
       */
      after: ms => {
        if (ms) {
          return setTimeout(() => {
            elem.classList.add("invisible")
          }, ms)
        }
      },
      default: elem.classList.add("invisible"),
    }
  },
}
