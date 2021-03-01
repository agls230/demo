import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Login = () => import('../views/Login')
const Register = () => import('../views/Register')
const User = () => import('../views/User')
const Role = () => import('../views/Role')
const Permission = () => import('../views/Permission')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Login
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/backstage/user',
        name: 'User',
        component: User
    },
    {
        path: '/backstage/role',
        name: 'Role',
        component: Role
    }, {
        path: '/backstage/permission',
        name: 'Permission',
        component: Permission
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// // 导航守卫，路由拦截
// router.beforeEach((to, from, next) => {
//     // 本地token有问题就执行
//     if (!localStorage.getItem('token')) {
//         if (to.path === '/login') {
//             next()
//         } else {
//             // 跳转登录
//             next({
//                 path: '/login',
//                 params: {
//                     redirect: to.fullPath
//                 }
//             })
//         }
//     } else {
//         next()
//     }
// })

// 捕获报错信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch(err => err)
}

export default router
