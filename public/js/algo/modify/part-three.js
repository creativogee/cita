export const processThree = partThree => {
  let newPartThree = []
  //processing partThree? (required)
  if (partThree.length > 0) {
    newPartThree = [
      ...partThree.slice(0, partThree.length - 1),
      partThree[partThree.length - 1].replace(",", ""),
    ]
  } else {
    newPartThree = partThree
  }

  return { journal: newPartThree.join(" ") }
}
