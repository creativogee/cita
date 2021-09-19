export const Location = {
  get place() {
    const url = window.location.href
    return url.includes("references.html") ? "references" : "home"
  },

  get baseUrl() {
    return location.origin
  },
}
