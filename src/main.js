import Vue from 'vue'
import App from './App.vue'

/**
 * to run = npm run serve
 *  
 * */

Vue.config.productionTip = false

require('@/assets/styles/skeleton.css')
require('@/assets/styles/normalize.css')
require('@/assets/styles/mycss.css')


new Vue({
  render: h => h(App),
}).$mount('#app')
