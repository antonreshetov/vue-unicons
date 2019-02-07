import Unicon from './Unicon.vue'

export default {
  install (Vue, options) {
    Vue.component(Unicon.name, Unicon)
  },
  add (icons) {
    Unicon.add(icons)
  }
}

export {
  Unicon
}
