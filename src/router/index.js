import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
// 注册
const Register = () => import('../views/Register')
// 登录
const Login = () => import('../views/Login')
// 首页
const Index = () => import('../views/Index')
// 分类页
const Classify = () => import('../views/Classify')
// 店铺详情页
const ShopDetail = () => import('../views/ShopDetail')
// 组队页
const Team = () => import('../views/Team')
// 商家页
const ShopPage = () => import('../views/ShopPage')
// 个人信息页
const ProFile = () => import('../views/ProFile')
// 后台用户页
const User = () => import('../views/User')
// 后台用户基本信息页
const UserBasic = () => import('../views/UserBasic')
// 后台用户状态信息页
const UserState = () => import('../views/UserState')
// 后台用户角色信息页
const UserToRole = () => import('../views/UserToRole')
// 后台角色页
const Role = () => import('../views/Role')
// 后台角色修改页
const RoleUpdate = () => import('../views/RoleUpdate')
// 后台角色的权限修改页
const RoleToPer = () => import('../views/RoleToPer')
// 后台权限页
const Permission = () => import('../views/Permission')
// 后台权限修改页
const PermissionUpdate = () => import('../views/PermissionUpdate')
// 后台商户修改页
const ShopManagement = () => import('../views/ShopManagement')
// 后台商品权限修改页
const ShoppingManagement = () => import('../views/ShoppingManagement')


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
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
        path: '/proFile',
        name: 'ProFile',
        component: ProFile
    },
    {
        path: '/classify',
        name: 'Classify',
        component: Classify
    },
    {
        path: '/shopDetail',
        name: 'ShopDetail',
        component: ShopDetail
    },
    {
        path: '/team',
        name: 'Team',
        component: Team
    },
    {
        path: '/shopPage',
        name: 'ShopPage',
        component: ShopPage
    },
    {
        path: '/backstage/user',
        name: 'User',
        component: User
    },
    {
        path: '/backstage/user/userBasic',
        name: 'UserBasic',
        component: UserBasic
    },
    {
        path: '/backstage/user/userState',
        name: 'UserState',
        component: UserState
    },
    {
        path: '/backstage/user/userToRole',
        name: 'UserToRole',
        component: UserToRole
    },
    {
        path: '/backstage/role',
        name: 'Role',
        component: Role
    },
    {
        path: '/backstage/role/roleUpdate',
        name: 'RoleUpdate',
        component: RoleUpdate
    },
    {
        path: '/backstage/role/roleToPer',
        name: 'RoleToPer',
        component: RoleToPer
    },
    {
        path: '/backstage/permission',
        name: 'Permission',
        component: Permission
    },
    {
        path: '/backstage/permission/permissionUpdate',
        name: 'PermissionUpdate',
        component: PermissionUpdate
    },
    {
        path: '/backstage/shopManagement',
        name: 'ShopManagement',
        component: ShopManagement
    },
    {
        path: '/backstage/shoppingManagement',
        name: 'ShoppingManagement',
        component: ShoppingManagement
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
// // 导航守卫，路由拦截
// router.beforeEach((to, from, next) => {
//     // 本地token有问题就执行
//     if (!this.$cookies.get('login')) {
//         if (to.path === '/login') {
//             next()
//         } else if (to.path === '/register') {
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
