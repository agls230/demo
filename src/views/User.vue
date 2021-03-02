<template>
    <div>
        <nav-bars/>
        <div class="table-responsive-md">
            <table class="table table-hover text-secondary small">
                <thead>
                <tr class="text-center">
                    <th>id</th>
                    <th>用户名</th>
                    <th>邮箱</th>
                    <th>真名</th>
                    <th>启用</th>
                    <th>锁定</th>
                    <th>过期</th>
                    <th>凭证</th>
                    <th>创建时间</th>
                    <th>账号操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="(list,index) in allInfo">
                    <td>{{list.id}}</td>
                    <td>{{list.username}}</td>
                    <td>{{list.email}}</td>
                    <td>{{list.realName}}</td>
                    <td>{{list.used}}</td>
                    <td>{{list.locked}}</td>
                    <td>{{list.userExpired}}</td>
                    <td>{{list.certificateExpired}}</td>
                    <td>{{list.createTime}}</td>
                    <td>
                        <button class="btn btn-sm btn-primary mr-1" @click="userBasic(index)">信息</button>
                        <button class="btn btn-sm btn-primary mr-1" @click="userState(index)">状态</button>
                        <button class="btn btn-sm btn-warning" @click="userToRole(index)">角色</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <foot/>
        <to-top/>
    </div>
</template>

<script>
    import {request} from "../network/request";
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";

    export default {
        name: "User",
        data() {
            return {
                allInfo: []
            }
        },
        components: {
            ToTop,
            Foot,
            NavBars,
        },
        methods: {
            // 页面初始化显示所有用户
            init() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'get',
                        url: '/user/super/users'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    this.allInfo = []
                    this.allInfo = res.data.users
                })
            },
            // 跳转修改用户基本信息
            userBasic(index) {
                this.$router.push({
                    path: '/backstage/user/userBasic',
                    query: {id: this.allInfo[index].id}
                })
            },
            // 跳转修改用户状态信息
            userState(index) {
                this.$router.push({
                    path: '/backstage/user/userState',
                    query: {id: this.allInfo[index].id}
                })
            },
            // 跳转修改用户角色信息
            userToRole(index) {
                this.$router.push({
                    path: '/backstage/user/userToRole',
                    query: {
                        id: this.allInfo[index].id,
                        username: this.allInfo[index].username
                    }
                })
            },
            // // 根据id改密码
            // request({
            //     method: 'post',
            //     url: '/user/simple/changePassword',
            //     params: {
            //         userId: this.allInfo[index].id,
            //         password: this.allInfo[index].password
            //     }
            // }).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
            // 根据email改密码
            // request({
            //     method: 'post',
            //     url: '/user/simple/findPassword',
            //     params: {
            //         email: this.allInfo[index].email,
            //         password: this.allInfo[index].password
            //     }
            // }).then(res => {
            //     console.log(res)
            // }).catch(err => {
            //     console.log(err)
            // })
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    th, td {
        white-space: nowrap;
    }
</style>