import { Location } from "./ui/helpers/location.js"
import { homeHandler, referencesHandler } from "./ui/index.js"

const place = Location.place

place === "home" ? homeHandler() : place === "references" ? referencesHandler() : null
