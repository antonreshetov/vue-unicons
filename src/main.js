import Vue from 'vue'
import App from './App.vue'
import Unicon from './components'
import * as icons from './icons'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

Unicon.add(Object.values({ ...icons }))
Vue.use(Unicon)

new Vue({
  render: h => h(App)
}).$mount('#app')
