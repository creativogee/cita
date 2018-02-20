export const verify = (authoursAndYear, title, journal, edition, pages) => {
  let markup = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}`

  if (markup === result.innerHTML) {
    throw "Your result is ready"
  }
  if (!authoursAndYear || !title || !journal) {
    throw "There has been an error. Please try another citation"
  }
}
