<template>
    <div>
        <nav-bars/>
        <div class="col-md-8 offset-md-2 mt-3 mb-3 col-12">
            <!--            基本信息行-->
            <div class="col-12 border bg-light mt-3">
                <div class="row mt-3 mb-3">
                    <div class="col-12 mb-3 border-bottom text-secondary">基本信息<i class="fa fa-info-circle"></i></div>
                </div>
                <div class="row d-flex align-items-center mb-3">
                    <div class="col-md-4 col-12 mb-3 mb-md-0">
                        <!--            头像-->
                        <div class="border" style="width: 100px;height: 100px;margin: 0 auto">
                            <img src="../assets/logo.png" style="width: 100%;height: 100%" alt="">
                        </div>
                    </div>
                    <div class="col-md-8 col-12">
                        <table class="table table-hover table-sm mb-0">
                            <tbody>
                            <tr>
                                <td>用户名：</td>
                                <td>{{name}}</td>
                            </tr>
                            <tr>
                                <td>邮箱：</td>
                                <td>{{email}}</td>
                            </tr>
                            <tr>
                                <td>真实姓名：</td>
                                <td>{{realName}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="col-12 text-right mt-3">
                        <button class="btn btn-sm btn-primary" @click="upd">修改</button>
                    </div>
                </div>
            </div>

            <!--            账号状态行-->
            <div class="col-12 border bg-light mt-3">
                <div class="row  mt-3 mb-3">
                    <div class="col-12 mb-3 border-bottom text-secondary">账号状态<i class="fa fa-info-circle"></i></div>
                </div>
                <div class="col-12 mb-3">
                    <table class="table table-hover table-sm">
                        <tbody>
                        <tr>
                            <td>是否启用：</td>
                            <td>{{used}}</td>
                        </tr>
                        <tr>
                            <td>是否锁定：</td>
                            <td>{{locked}}</td>
                        </tr>
                        <tr>
                            <td>是否过期：</td>
                            <td>{{userExpired}}</td>
                        </tr>
                        <tr>
                            <td>凭证过期：</td>
                            <td>{{certificateExpired}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-12 p-3 col-md-6 offset-md-3 text-center">
                <button class="btn btn-danger btn-block" @click="exit">退出登录</button>
            </div>
        </div>
        <!--        修改弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4"
             v-show="state">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloState">&times;</button>
            </div>
            <label class="form-check m-3">用户名
                <input type="text" class="form-control" v-model="shop.used">
            </label>
            <label class="form-check m-3">邮箱
                <input type="text" class="form-control" v-model="shop.top">
            </label>
            <label class="form-check m-3">真名
                <input type="text" class="form-control" v-model="shop.blocked">
            </label>
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="stateSuccess">完成</button>
            </div>
        </div>
        <foot/>
        <to-top/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";
    import {request} from "../network/request";
    import {success, tip} from "../util/promptBox";
    import {delayedRefresh} from "../util/delayedRefresh";

    export default {
        name: "ProFile",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                id: '',
                name: '',
                email: '',
                realName: '',
                used: '',
                locked: '',
                userExpired: '',
                certificateExpired: '',
                state: false,
                shop: {
                    used: '',
                    top: '',
                    blocked: '',
                }
            }
        },
        methods: {
            init() {
                request({
                    method: 'post',
                    params: {
                        name: localStorage.getItem('token')
                    },
                    url: '/user/findUserByUsername'
                }).then(res => {
                    // console.log(res.data.user)
                    this.id = res.data.user.id
                    this.name = res.data.user.username
                    this.email = res.data.user.email
                    this.realName = res.data.user.realName
                    this.used = res.data.user.used ? "是" : "否"
                    this.locked = res.data.user.locked ? "否" : "是"
                    this.userExpired = res.data.user.userExpired ? "否" : "是"
                    this.certificateExpired = res.data.user.certificateExpired ? "否" : "是"
                })
            },
            // 修改弹窗
            upd() {
                this.state = true
            },
            // 关闭弹窗
            cloState() {
                this.state = false
            },
            // 修改完成
            stateSuccess() {
                this.state = false
                if (this.shop.used && this.shop.top && this.shop.blocked) {
                    request({
                        method: 'post',
                        params: {
                            id: this.id,
                            username: this.shop.used,
                            email: this.shop.top,
                            realName: this.shop.blocked
                        },
                        url: '/user/simple/changeUser'
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.res === 'ok') {
                            success()
                            localStorage.setItem('token', this.shop.used)
                            delayedRefresh()
                        }
                    })
                } else {
                    tip('信息填写不完整。')
                }
            },
            // 退出登录
            exit() {
                request({
                    method: 'get',
                    url: '/logout'
                }).then(res => {
                    if (res.data.res === 'logoutSucceed') {
                        success('退出成功。')
                        localStorage.removeItem('token')
                        localStorage.removeItem('role')
                        this.$router.push('/login')
                    }
                })
            }
        },
        mounted() {
            this.init()
            console.log(this.id)
        }
    }
</script>

<style scoped>
    .add {
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
</style>