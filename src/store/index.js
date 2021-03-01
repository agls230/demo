import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
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
            createTime:'',
            lastTime:''
        }
    },
    mutations: {
        // 携带token信息并更新本地token
        changeToken(state, newer) {
            state.token = newer
            localStorage.setItem('token', newer)
        },
        // 更新用户信息
        changeUserInfo(state, newer) {
            state.userInfo = newer
        }
    },
    actions: {},
    modules: {}
})
