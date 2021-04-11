import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(require('vue-cookies'))

export default new Vuex.Store({
    state: {
        comment: {
            id: localStorage.getItem('saveId') ? localStorage.getItem('saveId') : '',
            type: localStorage.getItem('saveType') ? localStorage.getItem('saveType') : ''
        },
        // 用户名
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        // // cookie
        // cookie: this.$cookies.get('login') ? this.$cookies.get('login') : '',
        // 用户身份
        role: localStorage.getItem('role') ? localStorage.getItem('role') : '',
        // 用户id
        userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : '',
        // 商铺id
        shopId: localStorage.getItem('shopId') ? localStorage.getItem('shopId') : '',
    },
    mutations: {
        // 携带并更新本地用户名
        changeToken(state, newer) {
            state.token = newer
            localStorage.setItem('token', newer)
        },
        // // 携带cookie信息并更新本地cookie
        // changeCookie(state, newer) {
        //     state.cookie = newer
        //     this.$cookies.set('login', newer, '1d')
        // },
        // 更新用户信息
        changeComment(state, newer) {
            state.comment = newer
            localStorage.setItem('saveId', newer.id)
            localStorage.setItem('saveType', newer.type)
        },
        // 更改角色
        changeRole(state, newer) {
            state.role = newer
            localStorage.setItem('role', newer)
        },
        // 更改登陆者的id
        changeUserId(state, newer) {
            state.userId = newer
            localStorage.setItem('userId', newer)
        },
        // 更改商铺的id
        changeShopId(state, newer) {
            state.shopId = newer
            localStorage.setItem('shopId', newer)
        }
    },
    actions: {},
    modules: {}
})
