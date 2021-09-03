//setting up reference store
let refStore = localStorage.getItem("end-ref")
if (!refStore) {
  refStore = []
  const refStoreJSON = JSON.stringify(refStore)
  localStorage.setItem("end-ref", refStoreJSON)
}
