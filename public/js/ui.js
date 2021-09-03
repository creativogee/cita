import convertCitation from "./app.js"

const currentLocation = location.origin
let refStore = localStorage.getItem("end-ref")
const storedRef = JSON.parse(refStore)
let refLength
if (storedRef) {
  refLength = storedRef.length
}

if (window.location.href.includes("index.html")) {
  // const device = navigator.userAgent
  const citationInput = document.getElementById("rawCitation")
  const convertButton = document.getElementById("convertButton")
  const copyButton = document.getElementById("copyButton")
  const clearButton = document.getElementById("clearButton")
  const result = document.getElementById("result")
  const inText = document.getElementById("inText")
  const counter = document.getElementById("counter")
  const homeCounter = document.getElementById("homeCounter")
  const modal = document.getElementById("modal")

  if (storedRef.length > 0) {
    homeCounter.classList.remove("invisible")
    counter.textContent = storedRef.length
  }

  convertButton.addEventListener("click", async evt => {
    evt.preventDefault()
    const { intextRef, authoursAndYear, title, journal, edition, pages, error } = convertCitation(
      citationInput.value
    )

    if (authoursAndYear && title) {
      const formatted = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}`
      result.innerHTML = formatted
      inText.innerHTML = intextRef

      if (!storedRef.includes(formatted)) {
        homeCounter.classList.remove("invisible")
        storedRef.push(formatted)
        counter.textContent = storedRef.length
        const refStore = JSON.stringify(storedRef)
        localStorage.setItem("end-ref", refStore)
      }
    } else {
      if (citationInput.value === "") {
        result.innerHTML = ""
      }
      modal.classList.remove("invisible")
      modal.textContent = error
      setTimeout(() => {
        modal.classList.add("invisible")
      }, 3000)
    }
  })

  copyButton.addEventListener("click", evt => {
    evt.preventDefault()
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(result)
    selection.removeAllRanges()
    selection.addRange(range)
    // navigator.clipboard.writeText(result.textContent)

    // if (result.textContent) {
    //   copyButton.textContent = "Copied"
    //   setTimeout(() => {
    //     copyButton.textContent = "Copy Plain Text"
    //   }, 1500)
    // }

    /** OR SIMPLY
    navigator.clipboard.writeText(result.innerHTML
  */
  })
  clearButton.addEventListener("click", evt => {
    evt.preventDefault()
    result.textContent = ""
  })

  citationInput.addEventListener("focusin", () => {
    citationInput.select()
  })

  // if (device.match(/Mobi|Android/i)) {
  //   hint.textContent = "**long press to copy formatted text"
  // }
}

if (window.location.href.includes("end-citations.html")) {
  const listWrapper = document.getElementById("list-wrapper")
  const copyAllButton = document.getElementById("copyAllButton")
  const clearAllButton = document.getElementById("clearAllButton")
  const listCounter = document.getElementById("listCounter")
  const counter = document.getElementById("counter")

  copyAllButton.addEventListener("click", evt => {
    evt.preventDefault()
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(listWrapper)
    selection.removeAllRanges()
    selection.addRange(range)
  })

  clearAllButton.addEventListener("click", evt => {
    localStorage.clear()
    listWrapper.textContent = ""
    location.replace(`${currentLocation}/index.html`)
  })

  if (refLength > 0) {
    counter.textContent = storedRef.length
    listCounter.classList.remove("invisible")

    const refs = storedRef.map(
      (ref, idx) =>
        `<div class="delete-ref"><div id=${idx} class="delete"></div><p id=${idx} class="ref">${ref}</p></div>`
    )
    listWrapper.innerHTML = refs.join(" ")

    const deleteOne = document.querySelectorAll(".delete")
    const ref = document.querySelectorAll(".ref")
    Object.keys(deleteOne).map(index => {
      deleteOne[index].addEventListener("click", evt => {
        evt.preventDefault()
        const newStoredRef = storedRef.filter(item => item !== ref[index].innerHTML)
        const refStore = JSON.stringify(newStoredRef)
        localStorage.setItem("end-ref", refStore)
        location.reload()
      })
    })
  }
}
