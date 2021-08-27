import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import http from './plugins/http'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/main.scss'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
