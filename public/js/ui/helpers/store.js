export class Store {
  constructor(nombre) {
    this.nombre = nombre
    this.portfolio = JSON.parse(localStorage.getItem(this.nombre)) || []
  }

  stash(payload) {
    this.portfolio.push(payload)
    localStorage.setItem(this.nombre, JSON.stringify(this.portfolio))
    return this.portfolio
  }

  retrieve() {
    return this.portfolio
  }

  remove(target) {
    const store = JSON.parse(localStorage.getItem(this.nombre))
    const found = store.indexOf(target)
    if (found >= 0) {
      store.splice(found, 1)
      localStorage.setItem(this.nombre, JSON.stringify(store))
    }
    return this.portfolio
  }

  clear() {
    localStorage.removeItem(this.nombre)
    return this.portfolio
  }

  get total() {
    return this.portfolio.length || 0
  }
}
