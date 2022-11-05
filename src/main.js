import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/theme'
import * as API from '@/api'
import * as CONFIG from '@/config'
import * as UTILS from '@/utils'

Vue.prototype.$config = CONFIG
Vue.prototype.$utils = UTILS
Vue.prototype.$api = API
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
