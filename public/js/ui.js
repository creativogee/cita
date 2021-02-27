import convertCitation from './app.js'

const device = navigator.userAgent
const citationInput = document.getElementById('rawCitation')
const convertButton = document.getElementById('convertButton')
const result = document.getElementById('result')
const modal = document.getElementById('modal')
const hint = document.getElementById('hint')

convertButton.addEventListener('click', async (evt) => {
  evt.preventDefault()
  const {authoursAndYear, title, journal, edition, pages, error} = convertCitation(citationInput.value)

  if (authoursAndYear && title) {
    result.innerHTML = `${authoursAndYear} ${title} <i>${journal}</i> <b>${edition}</b> ${pages}` 
  } else {
    if(citationInput.value === '') {
      result.innerHTML = ''
    }
    modal.classList.remove('invisible')
    modal.textContent = error
    setTimeout(() => {
      modal.classList.add('invisible')
    }, 3000) 
  }
})

citationInput.addEventListener('focusin', () => {
  citationInput.select()
})

if (device.match(/Mobi|Android/i)) {
  hint.textContent = "**long press on the result then select all to copy"
}