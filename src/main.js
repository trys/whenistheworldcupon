// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import time from './plugins/time'
import ga from 'vue-ga'

Vue.config.productionTip = false

Vue.mixin(time)
ga(router, 'UA-109880470-1')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
