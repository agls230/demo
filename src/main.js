import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/font-awesome-4.7.0/css/font-awesome.css'
import axios from 'axios'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
    ak: 'lBS0YOeFK4GMS3mme5WngWV1o17mG5Dz'
})
Vue.use(require('vue-cookies'))
Vue.prototype.axios = axios
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
