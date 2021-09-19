// import convertCitation from "../app.js"
import { convertCitation } from "../../algo/index.js"
import { Store, dom } from "../helpers/index.js"
import { Target } from "../factories/index.js"
import { home } from "../repositories/index.js"

const store = new Store("end-ref")

export const homeHandler = () => {
  // const device = navigator.userAgent
  const {
    citationInput,
    convertButton,
    copyButton,
    clearButton,
    result,
    inText,
    counter,
    homeCounter,
    modal,
  } = home

  if (store.total > 0) {
    dom.show(homeCounter)
  }

  counter.textContent = store.total

  convertButton.addEventListener("click", async evt => {
    evt.preventDefault()

    const { intextRef, authoursAndYear, title, journal, edition, pages, error } = convertCitation(
      citationInput.value,
    )

    if (authoursAndYear && title) {
      const formatted = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}`

      result.innerHTML = formatted

      inText.innerHTML = intextRef

      if (!store.retrieve().includes(formatted)) {
        dom.show(homeCounter)

        store.stash(formatted)

        counter.textContent = store.total
      }
    } else {
      result.innerHTML = !citationInput.value ? "" : null

      dom.show(modal)

      modal.textContent = error

      dom.hide(modal).after(3000)
    }
  })

  copyButton.addEventListener("click", evt => {
    evt.preventDefault()

    const target = new Target(result)

    target.select()
  })

  clearButton.addEventListener("click", evt => {
    evt.preventDefault()

    if (store.total < 1) {
      dom.hide(homeCounter)
    }

    counter.textContent = store.total

    result.textContent = ""
  })

  citationInput.addEventListener("focusin", () => {
    citationInput.select()
  })

  // if (device.match(/Mobi|Android/i)) {
  //   hint.textContent = "**long press to copy formatted text"
  // }
}
