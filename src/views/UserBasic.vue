<template>
    <div>
        <nav-bars/>
        <div class="">
            <div class="col-md-8 offset-md-2 mt-5 mb-5 col-12 table-responsive-md">
                <div class="col-md-12 mb-3">修改用户基本信息：</div>
                <table class="table table-hover text-secondary small col-12 col-md-12">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>用户名</th>
                        <th>密码</th>
                        <th>邮箱</th>
                        <th>真名</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input type="text" v-model="userBasicInfo.id" disabled></td>
                        <td><input type="text" v-model="userBasicInfo.username"></td>
                        <td><input type="text" v-model="userBasicInfo.password"></td>
                        <td><input type="email" v-model="userBasicInfo.email"></td>
                        <td><input type="text" v-model="userBasicInfo.realName"></td>
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
        name: "UserBasic",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                userBasicInfo: {
                    id: '',
                    username: '',
                    password: '',
                    email: '',
                    realName: ''
                }
            }
        },
        methods: {
            // 页面初始化接收传来的用户id
            init() {
                if (this.userBasicInfo.id) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            url: '/user/simple/user',
                            params: {
                                id: this.userBasicInfo.id
                            }
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        this.userBasicInfo = res.data.user
                    })
                }
            },
            // 提交修改的用户基本信息
            submit() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        url: '/user/simple/changeUser',
                        params: {
                            id: this.userBasicInfo.id,
                            username: this.userBasicInfo.username,
                            email: this.userBasicInfo.email,
                            realName: this.userBasicInfo.realName
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
            this.userBasicInfo.id = this.$route.query.id
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