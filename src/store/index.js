import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(require('vue-cookies'))

export default new Vuex.Store({
    state: {
        // // token
        // token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        // // cookie
        // cookie: this.$cookies.get('login') ? this.$cookies.get('login') : '',
        // 用户信息
        userInfo: {
            id: '',
            username: '',
            password: '',
            email: '',
            realName: '',
            isUsed: '',
            isLocked: '',
            userExpired: '',
            certificateExpired: '',
            createTime: '',
            lastTime: ''
        }
    },
    mutations: {
        // // 携带token信息并更新本地token
        // changeToken(state, newer) {
        //     state.token = newer
        //     localStorage.setItem('token', newer)
        // },
        // // 携带cookie信息并更新本地cookie
        // changeCookie(state, newer) {
        //     state.cookie = newer
        //     this.$cookies.set('login', newer, '1d')
        // },
        // 更新用户信息
        changeUserInfo(state, newer) {
            state.userInfo = newer
        }
    },
    actions: {},
    modules: {}
})
