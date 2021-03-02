import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import './assets/font-awesome-4.7.0/css/font-awesome.css'
import axios from 'axios'

Vue.use(require('vue-cookies'))
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
