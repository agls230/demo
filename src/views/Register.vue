<template>
    <div>
        <button @click="zzz">sss</button>
        <div class="row">
            <div class="col-10 offset-1 col-md-4 offset-md-4 reg">
                <div class="transY" ref="transY">
                    <!--                    发送邮箱验证-->
                    <div class="w-100">
                        <label for="email">邮箱验证：</label>
                        <input class="form-control" id="email" placeholder="请输入邮箱地址" type="email"
                               v-model="email">
                        <div class="small text-danger" ref="emailTip" style="height: 20px"></div>
                        <button type="button" @click="sendEmail"
                                class="btn btn-primary col-3 offset-9 col-md-2 offset-md-10">发送
                        </button>
                    </div>
                    <!--                    验证字符串-->
                    <div class="w-100">
                        <label for="check">验证码：</label>
                        <input class="form-control" id="check" placeholder="请输入验证码" type="text"
                               v-model="check">
                        <div class="small text-danger" ref="checkTip" style="height: 20px"></div>
                        <button type="button" @click="prev"
                                class="btn btn-primary col-3 offset-5 col-md-2 offset-md-7 mr-1">后退
                        </button>
                        <button type="button" @click="checkEmail"
                                class="btn btn-primary col-3 col-md-2">继续
                        </button>
                    </div>
                    <!--                    注册-->
                    <div class="w-100">
                        <label for="name">用户名：</label>
                        <input class="form-control" id="name" placeholder="请输入用户名" type="text"
                               v-model="username">
                        <label for="pass">密码：</label>
                        <input class="form-control" id="pass" placeholder="请输入密码" type="password"
                               v-model="password">
                        <div class="small text-danger" ref="regTip" style="height: 20px"></div>
                        <button type="button" @click="reg"
                                class="btn btn-primary btn-block">注册
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "Register",
        data() {
            return {
                transYHeight: 200,
                email: '',
                check: '',
                username: '',
                password: ''
            }
        },
        methods: {
            // 注册时页面上翻显示
            transY() {
                const obj = this.$refs.transY
                obj.style.transform = 'translateY(-' + this.transYHeight + 'px)'
                obj.style.transition = 'all 200ms'
                this.transYHeight += 200
            },
            // 发送邮箱
            sendEmail() {
                if (this.email.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'get',
                            params: {email: this.email},
                            url: '/re/register'
                        }).then(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        })
                    }).then(res => {
                        if (res.data.res === '已发送注册码') {
                            this.transY()
                        } else {
                            this.$refs.emailTip.innerHTML = res.data.res
                        }
                    }, err => {
                        console.log(err)
                    })
                }
            },
            // 后退上一步
            prev() {
                location.reload()
            },
            // 邮箱验证
            checkEmail() {
                if (this.check.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'get',
                            url: '/re/check/' + this.check
                            //  3277205198@qq.com
                        }).then(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        })
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            this.transY()
                        } else {
                            this.$refs.checkTip.innerHTML = '验证码错误'
                        }
                    }, err => {
                        console.log(err)
                        this.$refs.checkTip.innerHTML = '验证码错误'
                    })
                }
            },
            // 正式注册
            reg() {
                if (this.username.length > 0 && this.password.length > 0) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                username: this.username,
                                password: this.password,
                                email: this.email
                            },
                            url: '/re/register'
                        }).then(res => {
                            resolve(res)
                        }, err => {
                            reject(err)
                        })
                    }).then(res => {
                        console.log(this.username, this.password, this.email)
                        if (res.data.res === '注册成功！') {
                            this.$router.replace({
                                name: 'Login',
                                params: {username: this.username, password: this.password}
                            })
                        } else {
                            this.$refs.regTip.innerHTML = res.data.res + '请重新请填写信息。'
                        }
                    }, err => {
                        console.log(err)
                    })
                }
            },
            zzz() {
                this.transY()
            }
        }
    }
</script>

<style scoped>
    .reg {
        height: 200px;
        overflow: hidden;
    }

    .transY {
        height: inherit;
    }

    .transY div {
        height: inherit;
    }

</style>