<template>
    <div class="col-12 text-secondary">
        <nav-bar/>
        <top/>
        <!--            当前信息导航-->
        <div class="row m-3">
            <div class="input-group offset-md-4 col-md-4">
                <input type="text" class="form-control" v-model="findById" placeholder="由用户名搜索">
                <div class="input-group-append">
                    <button class="btn btn-success" @click="searchId" type="button"><i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <!--            表头-->
        <div class="row border-bottom text-dark" style="height: 40px">
            <div class="col-md-1 offset-md-3">序号</div>
            <div class="col-md-1">id</div>
            <div class="col-md-1">角色</div>
            <div class="col-md-1">描述</div>
            <div class="col-md-2 text-center">操作</div>
        </div>
        <div class="hid row mb-1" v-for="(list,index) in allInfo">
            <div @click="" class="col-md-1 offset-md-3">{{index+1}}</div>
            <div @click="" class="col-md-1">{{list.id}}</div>
            <div @click="" class="col-md-1"><input v-model="list.name" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.roleDescription" disabled></div>
            <div class="col-md-2">
                <button class="btn btn-sm btn-primary" @click="update(index)">修改</button>
                <button class="btn btn-sm btn-success" @click="updateSuccess(index)">提交</button>
                <button class="btn btn-sm btn-info" @click.left="insert" @click.right.prevent="roleToUserAdd(index)">新增
                </button>
                <button class="btn btn-sm btn-danger" @click.left="del(index)"
                        @click.right.prevent="roleToUserDel(index)">删除
                </button>
                <button class="btn btn-sm btn-warning" @click="roleToPer(index)">权限</button>
            </div>
        </div>
        <!--        新增角色弹框-->
        <div class="col-md-3 h-auto position-absolute border bg-light" :class="{'active':isActive}">
            <label for="demo" class="mt-2">角色名:</label>
            <input type="text" class="form-control mb-3" id="demo" v-model="roleName">
            <label for="d">描述:</label>
            <input type="text" class="form-control mb-3" id="d" v-model="roleDes">
            <button class="btn btn-success offset-md-8 mb-3" @click="insSucc">完成</button>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import Top from '../components/Top';
    import {request} from "../network/request";

    export default {
        name: "Role",
        components: {
            NavBar,
            Top
        },
        data() {
            return {
                allInfo: [],
                findById: '',
                isActive: true,
                roleName: '',
                roleDes: '',
                fromUserId: 0
            }
        },
        methods: {
            // 页面初始化显示所有角色
            init() {
                if (this.$route.params.id) {
                    this.fromUserId = this.$route.params.id
                }
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/role/roles'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    console.log(res.data.roles)
                    this.allInfo = res.data.roles
                })
            },
            // 给用户新增角色，面向用户
            roleToUserAdd(index) {
                if (this.fromUserId > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/user/super/addRoleToUser',
                            params: {
                                userId: this.fromUserId,
                                roleId: this.allInfo[index].id
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                    })
                }
            },
            // 删除指定用户的指定角色，面向用户
            roleToUserDel(index) {
                if (this.fromUserId > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/user/super/delRoleToUser',
                            params: {
                                userId: this.fromUserId,
                                roleId: this.allInfo[index].id
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                    })
                }
            },
            // 由用户名搜索
            searchId() {
                if (this.findById.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/role/role',
                            params: {
                                username: this.findById
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data.roles)
                        this.allInfo = res.data.roles
                        console.log(this.allInfo)
                    })
                }
            },
            // 修改信息
            update(index) {
                let num = index * 2 + 1
                document.getElementsByTagName('input')[num].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 1].removeAttribute('disabled')
            },
            // 提交修改的信息
            updateSuccess(index) {
                let num = index * 2 + 1
                document.getElementsByTagName('input')[num].disabled = true
                document.getElementsByTagName('input')[num + 1].disabled = true
                request({
                    method: 'post',
                    url: '/role/changeSimple',
                    params: {
                        id: this.allInfo[index].id,
                        name: this.allInfo[index].name,
                        description: this.allInfo[index].roleDescription
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
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
                    console.log(res)
                    location.reload()
                }).catch(err => {
                    console.log(err)
                })
            },
            // 弹出新增窗口
            insert() {
                this.isActive = false
            },
            // 新增角色
            insSucc() {
                if (this.roleName.length > 0 && this.roleDes.length > 0) {
                    request({
                        method: 'post',
                        url: '/role/addRole',
                        params: {
                            name: this.roleName,
                            description: this.roleDes
                        }
                    }).then(res => {
                        console.log(res)
                        location.reload()
                    }).catch(err => {
                        console.log(err)
                    })
                }
                this.isActive = true
            },
            roleToPer(index) {
                this.$router.push({
                    name: 'Permission',
                    params: {roleId: this.allInfo[index].id}
                })
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .hid div input {
        border: none;
        outline: none;
        background-color: rgba(255, 255, 255, 0);
    }

    .hid div {
        overflow: hidden;
    }

    .position-absolute {
        left: 50%;
        top: 30%;
        transform: translate(-50%);
        z-index: 100;
        border-radius: 5px;
    }

    .active {
        display: none;
    }
</style>