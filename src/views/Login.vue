<template>
    <div class="position-absolute col-12 log">
        <div class="col-10 offset-1 col-md-4 offset-md-4">
            <label for="username">用户名：</label>
            <input class="form-control mb-3" id="username" placeholder="请输入用户名" type="text"
                   v-model="username">
            <label for="password">密码：</label>
            <input class="form-control mb-3" id="password" placeholder="请输入密码" type="password"
                   v-model="password">
            <label class="form-check-label">
                <input type="checkbox" class="form-check-inline" value="" v-model="rememberMe">记住登录
            </label>
            <div class="small text-danger" ref="logTip" style="height: 20px"></div>
            <button type="button" @click="login"
                    class="btn btn-success btn-block mb-2">登录
            </button>
            <p><span>还没有账号？去</span><span class="text-primary" @click="toReg" style="cursor: pointer">注册</span></p>
            <p><span>其他方式登录：</span><i class="fa fa-qq"></i><i class="fa fa-wechat"></i></p>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {request} from "../network/request";
    import {success} from "../util/promptBox";

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: '',
                rememberMe: ''
            }
        },
        methods: {
            ...mapMutations(["changeToken"]),
            // 跳转注册
            toReg() {
                this.$router.push('/register')
            },
            // 登录
            login() {
                let formData = new FormData();
                formData.append('username', this.username);
                formData.append('password', this.password);
                formData.append('rememberMe', this.rememberMe);
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        data: formData,
                        url: '/login'
                    }).then(res => {
                        resolve(res)
                    }, err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success('登陆成功。')
                        // // 写入cookie
                        // this.$cookies.set('login', this.username, '1d')
                        const _this = this
                        _this.changeToken(this.username)
                        // 登陆成功后跳转到来的页面或回到首页
                        this.$router.replace(this.$route.params.redirect || '/')
                    } else {
                        this.$refs.logTip.innerHTML = res.data.res
                    }
                }, err => {
                    console.log(err)
                })
            },
            // 页面初始化
            init() {
                this.username = this.$route.params.username
                this.password = this.$route.params.password
            }
        },
        mounted() {
            this.init()
        }

    }
</script>

<style scoped>
    i {
        margin: 0 10px;
        cursor: pointer;
    }

    .log {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>