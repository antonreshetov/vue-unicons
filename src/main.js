import Vue from 'vue'
import App from './App.vue'
import Unicon from './components'
import * as icons from './icons'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

Unicon.add(Object.values({ ...icons }))
Vue.use(Unicon)

Vue.use(VueAnalytics, {
  id: process.env.VUE_APP_GA,
  debug: {
    enabled: process.env.NODE_ENV === 'development',
    sendHitTask: process.env.NODE_ENV === 'production'
  }
})

Vue.mixin({
  methods: {
    gaEventClick (label, value = 1) {
      this.$ga.event('click', 'click', label, value)
    }
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
