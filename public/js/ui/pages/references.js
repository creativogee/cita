import { Store, Location, dom } from "../helpers/index.js"
import { Target, List } from "../factories/index.js"
import { references } from "../repositories/index.js"

const store = new Store("end-ref")

export const referencesHandler = () => {
  const { listWrapper, copyAllButton, clearAllButton, listCounter, counter } = references

  const baseUrl = Location.baseUrl

  copyAllButton.addEventListener("click", evt => {
    evt.preventDefault()

    const target = new Target(listWrapper)

    target.select()
  })

  clearAllButton.addEventListener("click", evt => {
    store.clear()

    listWrapper.textContent = ""

    location.replace(`${baseUrl}/pages/index.html`)
  })

  counter.textContent = store.total

  if (store.total > 0) {
    dom.show(listCounter)

    const list = store.retrieve()

    const reference = new List(list, listWrapper)
    reference.update()

    // const deleteOne = document.querySelectorAll(".delete")
    // const ref = document.querySelectorAll(".ref")
    // Object.keys(deleteOne).map(index => {
    //   deleteOne[index].addEventListener("click", evt => {
    //     evt.preventDefault()
    //     const newStoredRef = storedRef.filter(item => item !== ref[index].innerHTML)
    //     const refStore = JSON.stringify(newStoredRef)
    //     localStorage.setItem("end-ref", refStore)
    //     location.reload()
    //   })
    // })
  }
}
