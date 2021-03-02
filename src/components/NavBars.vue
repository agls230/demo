<template>
    <div class="">
        <nav class="col-12 col-md-12 navbar navbar-expand-md bg-info navbar-dark">
            <!--            logo-->
            <a class="navbar-brand col-md-1 col-4 d-none d-md-block" href="/">文字Logo</a>
            <!--            小屏显示按钮-->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse col-md-9" id="collapsibleNavbar">
                <ul class="navbar-nav">
                    <!-- 菜单 -->
                    <li class="nav-item">
                        <a class="nav-link">导航1</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">导航2</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">导航3</a>
                    </li>
                    <!-- 下拉菜单 -->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            下拉导航1
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">导航1</a>
                            <a class="dropdown-item">导航2</a>
                            <a class="dropdown-item">导航3</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            下拉导航2
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item">导航1</a>
                            <a class="dropdown-item">导航2</a>
                            <a class="dropdown-item">导航3</a>
                        </div>
                    </li>
                    <!--                后台入口-->
                    <!--                后台入口-->
                    <!--                后台入口-->
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-toggle="dropdown">
                            后台管理
                        </a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" @click="toUser">用户管理</a>
                            <a class="dropdown-item" @click="toRole">角色管理</a>
                            <a class="dropdown-item" @click="toPre">权限管理</a>
                        </div>
                    </li>
                </ul>
                <!--            搜索框-->
                <div class="d-none d-md-block">
                    <form class="form-inline">
                        <input class="form-control" type="text" placeholder="Search">
                        <button class="btn btn-success" type="button" @click="se"><i class="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
            <div class="position-absolute align-items-center col-md-2 col-6" style="right: 0;top: 8px">
                <div class="d-flex">
                    <!--            登录头像-->
                    <div class="img mr-3 ml-3">
                        <img :src="img" alt="" style="width:100%;height: 100%">
                    </div>
                    <!--登录注册-->
                    <div :class="{'logSuccess':logSuccess}" ref="logSuccess" @click.self="ProFile">
                        <a class="navbar-text" @click.stop="toLog">登录</a>
                        <span class="navbar-text">，</span>
                        <a class="navbar-text" @click.stop="toReg">注册</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "NavBars",
        data() {
            return {
                logSuccess: false,
                img: ''
            }
        },
        methods: {
            // 跳转用户管理
            toUser() {
                this.$router.push('/backstage/user')
            },
            // 跳转角色管理
            toRole() {
                this.$router.push('/backstage/role')
            },
            // 跳转权限管理
            toPre() {
                this.$router.push('/backstage/permission')
            },
            // 搜索
            se() {

            },
            // 跳转登录
            toLog() {
                this.$router.push({
                    name: 'Login',
                    params: {redirect: this.$route.fullPath}
                })
            },
            // 跳转注册
            toReg() {
                this.$router.push('/register')
            },
            // 跳转个人信息
            ProFile() {
                this.$router.push('/proFile')
            }
        },
        mounted() {
            // 模拟传值，登陆成功
            // this.$refs.logSuccess.innerHTML = 'admin'
            // this.logSuccess = true
            this.img = 'https://static.runoob.com/images/mix/bird.jpg'
        }
    }
</script>

<style scoped>
    .img {
        border-radius: 50%;
        overflow: hidden;
        width: 40px;
        height: 40px;
    }

    a {
        cursor: pointer;
    }

    .logSuccess {
        color: rgba(255, 255, 255, 0.6);
        cursor: pointer;
    }

    .logSuccess:hover {
        text-decoration: underline;
    }

    .dropdown-menu{
        background-color: rgba(255,255,255,0);
        border: none;
    }
</style>