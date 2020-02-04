import Unicon from './Unicon.vue'

export default {
  install (Vue, options = {}) {

    const props = Unicon.props

    for (var option in options) {
      if (props.hasOwnProperty(option)) {
        Unicon.props[option] = {
          default: options[option]
        }
      }
    }

    Vue.component(Unicon.name, Unicon)
  },
  add (icons) {
    Unicon.add(icons)
  }
}

export {
  Unicon
}
