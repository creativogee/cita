export const processFourFive = (partFour, partFive) => {
  let newPartFour = []
  let newPartFive = []

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
  return { edition: newPartFour.join(" "), pages: newPartFive.join(" ") }
}
