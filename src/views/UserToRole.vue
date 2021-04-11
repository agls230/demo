<template>
    <div>
        <nav-bars/>
        <div class="d-md-flex justify-content-around">
            <!--            用户角色-->
            <div class="mt-md-5 mb-md-5 mb-3 col-md-3 col-12">
                <div class="col-12 mb-3">
                    修改用户
                    <span class="text-primary ml-1 mr-1">{{UserToRole.username}}</span>
                    的角色信息：
                </div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr class="text-center">
                        <th>已有角色</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="(list,index) in userRole">
                        <td>{{list}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--            所有角色-->
            <div class="mt-md-5 mb-md-5 col-md-7 col-12 table-responsive-md">
                <div class="col-12 mb-3">
                    所有角色：
                </div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr class="text-center">
                        <th>角色id</th>
                        <th>角色名</th>
                        <th>描述</th>
                        <th>对用户操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="(list,index) in allRole">
                        <td>{{list.id}}</td>
                        <td>{{list.name}}</td>
                        <td>{{list.roleDescription}}</td>
                        <td>
                            <button class="btn btn-sm btn-primary mr-1" @click="addUserRole(index)">添加</button>
                            <button class="btn btn-sm btn-danger" @click="delUserRole(index)">删除</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div>
        </div>
<!--        <foot class="foot"></foot>-->
        <to-top/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";
    import {request} from "../network/request";
    import {error, success, tip} from "../util/promptBox";
    import {delayedRefresh} from "../util/delayedRefresh";

    export default {
        name: "UserToRole",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                UserToRole: {
                    id: '',
                    username: ''
                },
                userRole: [],
                allRole: []
            }
        },
        methods: {
            // 页面初始化
            init() {
                if (this.UserToRole.username) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/role/role',
                            params: {
                                username: this.UserToRole.username
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        this.userRole = res.data.roles
                    })
                }
            },
            inits() {
                if (this.UserToRole.username) {
                    // 所有角色
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/role/roles'
                        }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err)
                        })
                    }).then(res => {
                        this.allRole = res.data.roles
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                }
            },
            // 添加角色
            addUserRole(index) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/user/super/addRoleToUser',
                        params: {
                            userId: this.UserToRole.id,
                            roleId: this.allRole[index].id
                        }
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        delayedRefresh()
                    } else if (res.data.res === '用户已拥有此权限，不用再次添加！') {
                        tip('用户已拥有此权限。')
                    } else {
                        error()
                    }
                }).catch(err => {
                    console.log(err)
                    error()
                })
            },
            // 删除已有角色
            delUserRole(index) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/user/super/delRoleToUser',
                        params: {
                            userId: this.UserToRole.id,
                            roleId: this.allRole[index].id
                        }
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        delayedRefresh()
                    } else if (res.data.res === '该用户没有此权限，不用删除！') {
                        tip('该用户没有此角色，不用删除！')
                    } else {
                        error()
                    }
                }).catch(err => {
                    console.log(err)
                    error()
                })
            }
        },
        mounted() {
            this.UserToRole.id = this.$route.query.id
            this.UserToRole.username = this.$route.query.username
            this.init()
            this.inits()
        }
    }
</script>

<style scoped>
    input {
        width: 100%;
        background-color: rgba(255, 255, 255, 0);
        border: none;
    }

    /*.foot {*/
    /*    position: fixed;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*}*/

    th, td {
        white-space: nowrap;
    }
</style>