import convertCitation from './app.js'

const citationInput = document.getElementById('rawCitation')
const convertButton = document.getElementById('convertButton')
const result = document.getElementById('result')
const modal = document.getElementById('modal')

convertButton.addEventListener('click', async (evt) => {
  evt.preventDefault()
  const {authoursAndYear, title, journal, edition, pages, error} = await convertCitation(citationInput.value)

  if (authoursAndYear && title) {
    result.innerHTML = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}` 
  } else {
    modal.classList.remove('invisible')
    modal.textContent = error
    citationInput.value = ''
    result.innerHTML = ''
    setTimeout(() => {
      modal.classList.add('invisible')
    }, 3000) 
  }
})

citationInput.addEventListener('focusin', () => {
  citationInput.select()
})