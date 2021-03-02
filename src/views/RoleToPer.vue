<template>
    <div>
        <nav-bars/>
        <div class=" d-md-flex justify-content-around">
            <!--            角色权限-->
            <div class="mt-md-5 mb-md-5 mb-3 col-md-5 col-12 table-responsive-md">
                <div class="col-12 mb-3">
                    修改角色id为
                    <span class="text-primary ml-1 mr-1">{{roleId}}</span>
                    的权限：
                </div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr class="text-center">
                        <th>权限名</th>
                        <th>标识符</th>
                        <th>路径</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="(list,index) in roleToPer">
                        <td>{{list.name}}</td>
                        <td>{{list.sign}}</td>
                        <td>{{list.uri}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <!--            所有权限-->
            <div class="mt-md-5 mb-md-5 col-md-6 col-12 table-responsive-md">
                <div class="col-12 mb-3">
                    所有权限：
                </div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr class="text-center">
                        <th>权限id</th>
                        <th>权限名</th>
                        <th>标识符</th>
                        <th>路径</th>
                        <th>对角色操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="(list,index) in allPer">
                        <td>{{list.id}}</td>
                        <td>{{list.name}}</td>
                        <td>{{list.sign}}</td>
                        <td>{{list.uri}}</td>
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
        <foot class="foot"></foot>
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
        name: "RoleToPer",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                roleId: '',
                roleToPer: [],
                allPer: []
            }
        },
        methods: {
            // 初始化，拿到角色id，查找角色已有权限；同时返回全部权限，对比
            init() {
                if (this.roleId) {


                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/permission/getPermission',
                            params: {
                                roleId: this.roleId
                            }
                        }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err)
                        })
                    }).then(res => {
                        console.log(res.data.permissions)
                        this.roleToPer = res.data.permissions
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            inits() {
                if (this.roleId) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/permission/getAllPermission'
                        }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err)
                        })
                    }).then(res => {
                        console.log(res.data)
                        this.allPer = res.data.permissions
                    }).catch(err => {
                        console.log(err)
                    })
                }
            },
            // 添加权限
            addUserRole(index) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/role/addPermissionToRole',
                        params: {
                            roleId: this.roleId,
                            permissionId: this.allPer[index].id
                        }
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    // console.log(res.data)
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
            // 删除已有权限
            delUserRole(index) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/role/delPermissionToRole',
                        params: {
                            roleId: this.roleId,
                            permissionId: this.allPer[index].id
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
                    } else if (res.data.res === '该用户没有此权限！') {
                        tip('该用户没有此权限，不用删除！')
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
            this.roleId = this.$route.query.roleId
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