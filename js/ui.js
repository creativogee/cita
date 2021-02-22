import convertCitation from './app.js'

const citationInput = document.getElementById('rawCitation')
const convertButton = document.getElementById('convertButton')
const result = document.getElementById('result')

convertButton.addEventListener('click', (evt) => {
  evt.preventDefault()
  const response = convertCitation(citationInput.value)
  const {authoursAndYear, title, journal, edition, pages} = response
  result.innerHTML = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}` 
})

citationInput.addEventListener('focusin', () => {
  citationInput.select()
})



