<template>
    <div>
        <nav-bars/>
        <div class="">
            <div class="col-md-8 col-12 offset-md-2 mt-5 mb-5 table-responsive-md">
                <div class="col-12 mb-3">修改用户状态信息：</div>
                <table class="table table-hover text-secondary small col-12">
                    <thead>
                    <tr class="text-center">
                        <th>id</th>
                        <th>是否启用</th>
                        <th>是否锁定</th>
                        <th>是否过期</th>
                        <th>凭证过期</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>{{userStateInfo.id}}</td>
                        <td><input type="checkbox" v-model="userStateInfo.used"></td>
                        <td><input type="checkbox" v-model="userStateInfo.locked"></td>
                        <td><input type="checkbox" v-model="userStateInfo.userExpired"></td>
                        <td><input type="checkbox" v-model="userStateInfo.certificateExpired"></td>
                    </tr>
                    </tbody>
                </table>
                <div class="col-12 text-right">
                    <button class="btn btn-success" @click="submit">完成</button>
                </div>
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
    import {error, success} from "../util/promptBox";

    export default {
        name: "UserState",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                userStateInfo: {
                    id: '',
                    used: '',
                    locked: '',
                    userExpired: '',
                    certificateExpired: ''
                }
            }
        },
        methods: {
            // 页面初始化接收传来的用户id
            init() {
                if (this.userStateInfo.id) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/user/simple/user',
                            params: {
                                id: this.userStateInfo.id
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        this.userStateInfo = res.data.user
                    })
                }
            },
            // 提交修改的用户基本信息
            submit() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/user/super/changeUser',
                        params: {
                            id: this.userStateInfo.id,
                            isUsed: this.userStateInfo.used,
                            isLocked: this.userStateInfo.locked,
                            userExpired: this.userStateInfo.userExpired,
                            certificateExpired: this.userStateInfo.certificateExpired
                        }
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                    } else {
                        error()
                    }
                })
            }
        },
        mounted() {
            this.userStateInfo.id = this.$route.query.id
            this.init()
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