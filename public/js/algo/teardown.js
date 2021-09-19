import { noCap } from "./no-cap.js"
/**
 * first letter capitalization,
 * '&' to 'and',
 * remove ellipsis
 * @param {string} citation raw citation
 * @returns array of torn down parts of raw citation
 */
export const teardown = citation => {
  let abbrvs = ["Bmj,"]
  let expandedAbbrvs = ["British Medical Journal"]

  let newCitation = []

  let ellipsis = /\.\.\.+/gm

  citation.split(" ").forEach(item => {
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

  return { newCitation }
}
