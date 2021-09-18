export const store = {
  name: "end-ref",

  portfolio: [],

  stash: payload => {
    const parcel = JSON.stringify(payload)
    localStorage.setItem(store.name, parcel)
  },

  retrieve: () => {
    store.portfolio = JSON.parse(localStorage.getItem(store.name))
    return store.portfolio
  },

  total: () => {
    return store.portfolio.length
  },
}
