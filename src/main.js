// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import $ from 'jquery'// 引入jquery，注意：需要提前执行npm install --save jquery

// import 'bootstrap/dist/css/bootstrap.min.css'// 引入bootstrap，注意：需要提前执行npm install --save bootstrap
// import 'bootstrap/dist/js/bootstrap.min.js'// 引入bootstrap，注意：需要提前执行npm install --save bootstrap

import './common/stylus/index.styl'

import axios from 'axios'// 引入axios
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
