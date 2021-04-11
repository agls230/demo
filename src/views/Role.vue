<template>
    <div>
        <nav-bars/>
        <div class=" d-md-flex table-responsive-md justify-content-center">
            <table class="table table-hover text-secondary small col-md-6 col-12">
                <thead>
                <tr class="text-center">
                    <th>id</th>
                    <th>角色</th>
                    <th>描述</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="(list,index) in allInfo">
                    <td>{{list.id}}</td>
                    <td>{{list.name}}</td>
                    <td>{{list.roleDescription}}</td>
                    <td>
                        <button class="btn btn-sm btn-primary mr-1" @click="updateRole(index)">修改</button>
                        <button class="btn btn-sm btn-danger mr-1" @click="del(index)">删除</button>
                        <button class="btn btn-sm btn-warning mr-1" @click="roleToPer(index)">权限</button>
                        <button class="btn btn-sm btn-primary" @click="addRoles">新增</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--        新增角色弹框-->
        <div class="position-absolute pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4" :class="{'isShow':isShow}">
            <label for="name">角色名：</label>
            <input id="name" type="text" class="form-control m-3" v-model="addRole.roleName">
            <label for="des">描述：</label>
            <input id="des" type="text" class="form-control m-3" v-model="addRole.roleDes">
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="addSuccess">完成</button>
            </div>
        </div>
<!--        <foot class="foot"></foot>-->
        <to-top/>
    </div>
</template>

<script>
    import {request} from "../network/request";
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";
    import {error, success, tip} from "../util/promptBox";
    import {delayedRefresh} from "../util/delayedRefresh";

    export default {
        name: "Role",
        data() {
            return {
                allInfo: [],
                isShow: true,
                addRole: {
                    roleName: '',
                    roleDes: ''
                }
            }
        },
        components: {
            ToTop,
            Foot,
            NavBars,
        },
        methods: {
            // 页面初始化显示所有角色
            init() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/role/roles'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    this.allInfo = res.data.roles
                })
            },
            // 跳转修改角色页面
            updateRole(index) {
                this.$router.push({
                    path: '/backstage/role/roleUpdate',
                    query: {
                        id: this.allInfo[index].id,
                        name: this.allInfo[index].name,
                        description: this.allInfo[index].roleDescription
                    }
                })
            },
            // 删除
            del(index) {
                request({
                    method: 'post',
                    url: '/role/delRole',
                    params: {
                        id: this.allInfo[index].id
                    }
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        delayedRefresh()
                    } else if (res.data.res === '有用户拥有此角色，不能删除此角色') {
                        tip('有用户拥有此角色，不能删除此角色')
                    } else {
                        error()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 弹出新增窗口
            addRoles() {
                this.isShow = false
            },
            // 新增角色
            addSuccess() {
                if (this.addRole.roleName.length > 0 && this.addRole.roleDes.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/role/addRole',
                            params: {
                                name: this.addRole.roleName,
                                description: this.addRole.roleDes
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
                        } else if (res.data.res === '角色已存在！') {
                            tip('角色已存在！')
                        } else {
                            error()
                        }
                    }).catch(err => {
                        console.log(err)
                        error()
                    })
                }
                this.isShow = true
            },
            // 跳转对角色的权限操作页
            roleToPer(index) {
                this.$router.push({
                    path: '/backstage/role/roleToPer',
                    query: {roleId: this.allInfo[index].id}
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    /*.foot {*/
        /*position: relative;*/
        /*bottom: 0;*/
        /*width: 100%;*/
    /*}*/

    .position-absolute {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border-radius: 5px;
    }

    .isShow {
        display: none;
    }

    th, td {
        white-space: nowrap;
    }
</style>