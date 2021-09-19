export const sorting = newCitation => {
  //citation string parts
  let partOne = [] //author(s) and year
  let partTwo = [] //tile
  let partThree = [] //journal
  let partFour = [] //version
  let partFive = [] //pages

  //citation string dividers
  let dividerOne
  let dividerTwo
  let dividerThree
  let dividerFour

  //splitter regular expressions
  let regexOne = /\(\d+\)\./gm
  let regexTwo = /[a-z]{2,}(\?*\.)$/gim
  let regexThree = /[0-9]+\([a-z0-9]+\),$|\([a-z0-9]+\),$|\d+,/gim

  //identifier regular expressions
  let digitDot = /\d+\./
  let digit = /\d+/

  let regexTwoMatch = []

  newCitation.map((item, index, arr) => {
    if (item.match(regexOne)) {
      dividerOne = index + 1
      partOne = arr.slice(0, dividerOne)
    }

    if (item.match(regexTwo)) {
      regexTwoMatch.push(item)
      if (arr[index + 1]) {
        dividerTwo = index + 1
        partTwo = arr.slice(dividerOne, dividerTwo)
      } else {
        let prevIndex = regexTwoMatch.indexOf(item) - 1
        let prevItem = regexTwoMatch[prevIndex]
        let target = arr.indexOf(prevItem)
        dividerTwo = target + 1
        partTwo = arr.slice(dividerOne, dividerTwo)
      }
    }

    if (item.match(regexThree)) {
      dividerThree = index
      dividerFour = index + 1
      partThree = arr.slice(dividerTwo, dividerThree)
      partFour = arr.slice(dividerThree, dividerFour)
      partFive = arr.slice(dividerFour)
      return true
    } else if (item.match(digitDot) && arr[index + 1]) {
      dividerThree = index - 1
      dividerFour = arr.length
      partThree = arr.slice(dividerTwo, dividerThree)
      partFour = arr.slice(dividerThree, dividerFour)
      partFive = arr.slice(dividerFour)
      return true
    } else if (item.match(digitDot) && !arr[index + 1]) {
      if (arr[index - 1].match(digit)) {
        dividerThree = index - 1
        dividerFour = index
      } else {
        dividerThree = index
        dividerFour = index + 1
      }

      partThree = arr.slice(dividerTwo, dividerThree)
      partFour = arr.slice(dividerThree, dividerFour)
      partFive = arr.slice(dividerFour)
      return true
    } else {
      dividerThree = index + 1
      partThree = arr.slice(dividerTwo, dividerThree)
    }
  })
  return { partOne, partTwo, partThree, partFour, partFive }
}
