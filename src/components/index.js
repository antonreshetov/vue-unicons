import Unicon from './Unicon.vue'

export default {
  install (Vue, options = {}) {
    Vue.component(Unicon.name, Unicon)

    for (const [ k, v ] of Object.entries(options)) {
      if (Unicon.props[k]) {
        Unicon.props[k].default = v
      }
    }
  },
  add (icons) {
    Unicon.add(icons)
  }
}

export {
  Unicon
}
