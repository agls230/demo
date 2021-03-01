<template>
    <div class="col-12 text-secondary">
        <nav-bar/>
        <top/>
        <!--            当前信息导航-->
        <div class="row m-3">
            <div class="input-group offset-md-4 col-md-4">
                <input type="text" class="form-control" v-model="findById" placeholder="由角色id搜索">
                <div class="input-group-append">
                    <button class="btn btn-success" @click="searchId" type="button"><i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <!--            表头-->
        <div class="row border-bottom text-dark" style="height: 40px">
            <div class="col-md-1 offset-md-2">序号</div>
            <div class="col-md-1">id</div>
            <div class="col-md-1">权限名</div>
            <div class="col-md-2">uri</div>
            <div class="col-md-1">sign</div>
            <div class="col-md-2 text-center">操作</div>
        </div>
        <div class="hid row mb-1" v-for="(list,index) in allInfo">
            <div @click="" class="col-md-1 offset-md-2">{{index+1}}</div>
            <div @click="" class="col-md-1">{{list.id}}</div>
            <div @click="" class="col-md-1"><input v-model="list.name" disabled></div>
            <div @click="" class="col-md-2"><input v-model="list.uri" disabled></div>
            <div @click="" class="col-md-1"><input v-model="list.sign" disabled></div>
            <div class="col-md-2">
                <button class="btn btn-sm btn-primary" @click="update(index)">修改</button>
                <button class="btn btn-sm btn-success" @click="updateSuccessS(index)">s</button>
                <button class="btn btn-sm btn-success" @click="updateSuccessSU(index)">s.u</button>
                <button class="btn btn-sm btn-success" @click="updateSuccessNSU(index)">n.s.u</button>
                <button class="btn btn-sm btn-info" @click.left="insert" @click.right.prevent="perToRoleAdd(index)">新增
                </button>
                <button class="btn btn-sm btn-danger" @click.left="del(index)"
                        @click.right.prevent="perToRoleDel(index)">删除
                </button>
            </div>
        </div>
        <!--        新增权限弹框-->
        <div class="col-md-3 h-auto position-absolute border bg-light" :class="{'active':isActive}">
            <label for="demo" class="mt-2">权限名:</label>
            <input type="text" class="form-control mb-3" id="demo" v-model="perName">
            <label for="d">标识符:</label>
            <input type="text" class="form-control mb-3" id="d" v-model="perSign">
            <label for="de">uri:</label>
            <input type="text" class="form-control mb-3" id="de" v-model="perUri">
            <button class="btn btn-success offset-md-8 mb-3" @click="insSucc">完成</button>
        </div>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import Top from '../components/Top';
    import {request} from "../network/request";

    export default {
        name: "Permission",
        components: {
            NavBar,
            Top
        },
        data() {
            return {
                allInfo: [],
                findById: '',
                isActive: true,
                perName: '',
                perSign: '',
                perUri: '',
                fromRoleRoleId: 0
            }
        },
        methods: {
            // 页面初始化显示所有角色
            init() {
                if (this.$route.params.roleId) {
                    this.fromRoleRoleId = this.$route.params.roleId
                }
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/permission/getAllPermission'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    console.log(res.data.permissions)
                    this.allInfo = res.data.permissions
                })
            },
            // 给角色新增权限，面向角色
            perToRoleAdd(index) {
                if (this.fromRoleRoleId > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/role/addPermissionToRole',
                            params: {
                                roleId: this.fromRoleRoleId,
                                permissionId: this.allInfo[index].id
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                    })
                }
            },
            // 删除指定角色的指定权限，面向角色
            perToRoleDel(index) {
                if (this.fromRoleRoleId > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/role/delPermissionToRole',
                            params: {
                                roleId: this.fromRoleRoleId,
                                permissionId: this.allInfo[index].id
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                    })
                }
            },
            // 由角色ID搜索
            searchId() {
                if (this.findById.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/permission/getPermission',
                            params: {
                                roleId: this.findById
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data.permissions)
                        this.allInfo = res.data.permissions
                    })
                }
            },
            // 修改权限信息
            update(index) {
                let num = index * 3 + 1
                document.getElementsByTagName('input')[num].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 1].removeAttribute('disabled')
                document.getElementsByTagName('input')[num + 2].removeAttribute('disabled')
            },
            // 提交修改sign的信息
            updateSuccessS(index) {
                let num = index * 3 + 1
                document.getElementsByTagName('input')[num].disabled = true
                document.getElementsByTagName('input')[num + 1].disabled = true
                document.getElementsByTagName('input')[num + 2].disabled = true
                request({
                    method: 'post',
                    url: '/permission/changePermissionSign',
                    params: {
                        id: this.allInfo[index].id,
                        sign: this.allInfo[index].sign
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            // 提交修改sign,uri的信息
            updateSuccessSU(index) {
                let num = index * 3 + 1
                document.getElementsByTagName('input')[num].disabled = true
                document.getElementsByTagName('input')[num + 1].disabled = true
                document.getElementsByTagName('input')[num + 2].disabled = true
                request({
                    method: 'post',
                    url: '/permission/changePermissionSignAndUri',
                    params: {
                        id: this.allInfo[index].id,
                        sign: this.allInfo[index].sign,
                        uri: this.allInfo[index].uri
                    }
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            },
            // 提交修改name,sign,uri的信息
            updateSuccessNSU(index) {
                let num = index * 3 + 1
                document.getElementsByTagName('input')[num].disabled = true
                document.getElementsByTagName('input')[num + 1].disabled = true
                document.getElementsByTagName('input')[num + 2].disabled = true
                request({
                    method: 'post',
                    url: '/permission/changePermissionAll',
                    params: {
                        id: this.allInfo[index].id,
                        name: this.allInfo[index].name,
                        sign: this.allInfo[index].sign,
                        uri: this.allInfo[index].uri
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
                    url: '/permission/delPermission',
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
            // 新增权限
            insSucc() {
                if (this.perName.length > 0 && this.perUri.length > 0 && this.perSign.length > 0) {
                    request({
                        method: 'post',
                        url: '/permission/addPermission',
                        params: {
                            name: this.perName,
                            sign: this.perSign,
                            uri: this.perSign
                        }
                    }).then(res => {
                        console.log(res)
                        location.reload()
                    }).catch(err => {
                        console.log(err)
                    })
                }
                this.isActive = true
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