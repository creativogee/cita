export class List {
  constructor(arr, element) {
    this.listWrapper = element
    this.textList = arr
  }

  static createListItem(text) {
    const outterDiv = document.createElement("div")
    outterDiv.classList.add("delete-ref")

    const innerDiv = document.createElement("div")
    innerDiv.classList.add("delete")

    const ref = document.createElement("p")
    ref.classList.add("ref")

    ref.innerHTML = text

    innerDiv.innerHTML

    outterDiv.appendChild(ref)
    outterDiv.appendChild(innerDiv)

    return outterDiv
  }

  update() {
    //clear list first
    while (this.listWrapper.firstChild) {
      this.listWrapper.removeChild(this.listWrapper.firstChild)
    }
    //fill list again
    for (const text of this.textList) {
      this.listWrapper.appendChild(List.createListItem(text))
    }
  }
}
