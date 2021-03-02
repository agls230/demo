<template>
    <div>
        <nav-bars/>
        <div class=" d-md-flex justify-content-center table-responsive-md">
            <table class="table table-hover text-secondary small col-md-8 col-12">
                <thead>
                <tr class="text-center">
                    <th>权限id</th>
                    <th>权限名</th>
                    <th>标识符</th>
                    <th>路径</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="(list,index) in allPer">
                    <td>{{list.id}}</td>
                    <td>{{list.name}}</td>
                    <td>{{list.sign}}</td>
                    <td>{{list.uri}}</td>
                    <td>
                        <button class="btn btn-sm btn-primary mr-1" @click="updatePer(index)">修改</button>
                        <button class="btn btn-sm btn-danger mr-1" @click="del(index)">删除</button>
                        <button class="btn btn-sm btn-primary" @click="perToRoleAdd">新增</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <!--        新增权限弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4" :class="{'isShow':isActive}">
            <label for="name">权限名：</label>
            <input id="name" type="text" class="form-control m-3" v-model="addPer.name">
            <label for="des">标识符：</label>
            <input id="des" type="text" class="form-control m-3" v-model="addPer.sign">
            <label for="d">路径：</label>
            <input id="d" type="text" class="form-control m-3" v-model="addPer.uri">
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="addSuccess">完成</button>
            </div>
        </div>
        <!--        修改权限弹框-->
        <div class="position-absolute updatePer pt-5 pb-5 pl-5 pr-5 border bg-white col-10 col-md-4" :class="{'updateP':updateP}">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="clo">&times;</button>
            </div>
            <button class="btn btn-block btn-outline-primary btn-sm" @click="updateS()">修改权限标识符</button>
            <button class="btn btn-block btn-outline-primary btn-sm" @click="updateSU()">修改权限标识符、路径</button>
            <button class="btn btn-block btn-outline-primary btn-sm" @click="updateNSU()">修改权限名、标识符、路径</button>
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
        name: "Permission",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                addPer: {
                    name: '',
                    sign: '',
                    uri: ''
                },
                allPer: [],
                isActive: true,
                updateP: true,
                ids: '',
                names: '',
                signs: '',
                uris: ''
            }
        },
        methods: {
            // 页面初始化显示所有角色
            init() {
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
                    this.allPer = res.data.permissions
                }).catch(err => {
                    console.log(err)
                })
            },
            // 弹窗修改权限
            updatePer(index) {
                this.ids = this.allPer[index].id
                this.names = this.allPer[index].name
                this.signs = this.allPer[index].sign
                this.uris = this.allPer[index].uri
                this.updateP = false
            },
            // 关闭修改权限弹窗
            clo() {
                this.updateP = true
            },
            // 转到修改sign页面
            updateS() {
                this.$router.push({
                    path: '/backstage/permission/PermissionUpdate',
                    query: {
                        id: this.ids,
                        signs: this.signs
                    }
                })
            },
            updateSU() {
                this.$router.push({
                    path: '/backstage/permission/PermissionUpdate',
                    query: {
                        id: this.ids,
                        signs: this.signs,
                        uris: this.uris
                    }
                })
            },
            updateNSU() {
                this.$router.push({
                    path: '/backstage/permission/PermissionUpdate',
                    query: {
                        id: this.ids,
                        names: this.names,
                        signs: this.signs,
                        uris: this.uris,
                    }
                })
            },
            // 删除
            del(index) {
                request({
                    method: 'post',
                    url: '/permission/delPermission',
                    params: {
                        id: this.allPer[index].id
                    }
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        delayedRefresh()
                    } else {
                        error()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            // 弹出新增窗口
            perToRoleAdd() {
                this.isActive = false
            },
            // 新增权限
            addSuccess() {
                if (this.addPer.name.length > 0 && this.addPer.sign.length > 0 && this.addPer.uri.length > 0) {
                    request({
                        method: 'post',
                        url: '/permission/addPermission',
                        params: {
                            name: this.addPer.name,
                            sign: this.addPer.sign,
                            uri: this.addPer.uri
                        }
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success()
                            delayedRefresh()
                        } else if (res.data.res === '权限已存在！') {
                            tip('权限已存在！')
                        } else {
                            error()
                        }
                    }).catch(err => {
                        console.log(err)
                    })
                } else {
                    tip('权限信息填写不完整。')
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
    /*.foot {*/
    /*    position: fixed;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*}*/

    .updatePer {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        border-radius: 5px;
    }

    .clo {
        top: 0;
        right: 0;
    }

    .add {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border-radius: 5px;
    }

    .isShow {
        display: none;
    }

    .updateP {
        display: none;
    }

    th, td {
        white-space: nowrap;
    }
</style>