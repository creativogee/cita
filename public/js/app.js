function convertCitation(citation) {
  try {
    if (citation === "") {
      throw "citation field cannot be empty"
    }
    let noCap = [
      "a",
      "despite",
      "from",
      "with",
      "an",
      "the",
      "at",
      "by",
      "for",
      "in",
      "is",
      "of",
      "on",
      "to",
      "up",
      "and",
      "as",
      "but",
      "or",
      "nor",
    ]
    let abbrvs = ["Bmj,"]
    let expandedAbbrvs = ["British Medical Journal"]
    //new citation string
    let newCitation = []
    //citation string parts
    let partOne = [] //author(s) and year
    let partTwo = [] //tile
    let partThree = [] //journal
    let partFour = [] //version
    let partFive = [] //pages

    //new citation string parts
    let newPartOne = []
    let newPartTwo = []
    let newPartThree = []
    let newPartFour = []
    let newPartFive = []

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
    let name = /[a-zÀ-ÖØ-öø-ÿ]{2,},$/gim
    let initials = /^[A-Z]{1,2}\.,*$/gm
    let ellipsis = /\.\.\.+/gm
    let digitDot = /\d+\./
    let digit = /\d+/

    //Initial processing
    /*
    - first letter capitalization
    - '&' to 'and'
    - remove ellipsis
    */
    citation.split(" ").forEach((item, index, arr) => {
      let firstLetter = item.charAt(0).toUpperCase()
      let restLetters = item.slice(1)
      let combinedLetters = firstLetter + restLetters

      if (item.match(ellipsis)) {
        return false
      } else if (!noCap.includes(item)) {
        if (item === "&") {
          let and = item.replace("&", "and")
          newCitation.push(and)
        } else if (abbrvs.includes(item)) {
          let index = abbrvs.indexOf(item)
          let expItem = expandedAbbrvs[index]
          newCitation.push(expItem)
        } else {
          newCitation.push(combinedLetters)
        }
      } else {
        newCitation.push(item)
      }
    })

    //Splitting newCitation into five parts

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
    //-----------------------------
    //processing partOne? (required)
    partOne.map((item, index, arr) => {
      if (item.match(name)) {
        let newItem = item.replace(",", "")
        newPartOne.push(newItem)
      } else if (item.match(initials) && arr[index + 1].match(initials)) {
        let multipleInitials = arr[index].replace(".", "") + arr[index + 1].replace(".", "")
        newPartOne.push(multipleInitials)
        arr.splice(index + 1, 1)
      } else if (item.match(initials)) {
        let loneInitial = item.replace(".", "")
        newPartOne.push(loneInitial)
      } else {
        newPartOne.push(item)
      }
    })

    //processing partTwo? (not required)
    newPartTwo = partTwo

    //processing partThree? (required)
    if (partThree.length > 0) {
      newPartThree = [
        ...partThree.slice(0, partThree.length - 1),
        partThree[partThree.length - 1].replace(",", ""),
      ]
    } else {
      newPartThree = partThree
    }

    //processing partFour and partFive? (required)
    if (partFour.length === 0) {
      newPartFour = []
      newPartFive = []
    } else if (partFive.length === 0) {
      newPartFour = partFour
      newPartFive = []
    } else {
      newPartFour = [partFour[0].replace(",", ":")]
      newPartFive = partFive
    }
    //-----------------------------
    const authoursAndYear = newPartOne.join(" ")
    const title = newPartTwo.join(" ")
    const journal = newPartThree.join(" ")
    const edition = newPartFour.join(" ")
    const pages = newPartFive.join(" ")

    let markup = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}`

    if (markup === result.innerHTML) {
      throw "Your result is ready"
    }
    if (!authoursAndYear || !title || !journal) {
      throw "There has been an error. Please try another citation"
    }

    let intextRef

    if (newPartOne.length > 2) {
      const firstAuthor = newPartOne[0]
      const yearinbracks = newPartOne[newPartOne.length - 1]
      const yearoutbracks = yearinbracks.slice(1, yearinbracks.length - 2)
      intextRef = `(${firstAuthor} <i>et al</i>, ${yearoutbracks})`
    } else {
      intextRef = `(${firstAuthor}, ${yearoutbracks})`
    }

    return { intextRef, authoursAndYear, title, journal, edition, pages }
  } catch (e) {
    return {
      error: e,
    }
  }
}

export default convertCitation
