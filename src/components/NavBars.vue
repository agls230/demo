<template>
    <div class="">
        <nav class="col-12 col-md-12 navbar navbar-expand-md bg-primary navbar-dark">
            <!--            logo-->
            <a class="navbar-brand col-md-1 col-4 d-none d-md-block" href="/">平台Logo</a>
            <!--            小屏显示按钮-->
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse col-md-9" id="collapsibleNavbar">
                <ul class="navbar-nav col-md-12 d-md-flex justify-content-md-around">
                    <!-- 菜单 -->
                    <li class="nav-item">
                        <a class="nav-link" @click="indexPage">首页推荐</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="classifyPage">分类浏览</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="team">组队大厅</a>
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
                    <!--商家入口-->
                    <li class="nav-item">
                        <a class="nav-link" @click="shopPage">我是商家</a>
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
                            <a class="dropdown-item" @click="toShop">商铺管理</a>
                            <a class="dropdown-item" @click="toShopping">商品管理</a>
                        </div>
                    </li>
                    <li class="nav-item d-none d-md-block">
                        <a class="nav-link" @click="showSe"><i class="fa fa-search">搜索</i></a>
                    </li>
                </ul>
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
        <!--        弹出搜索框-->
        <div class="d-none d-md-block col-md-5 position-relative se" :class="{'seStyle':seStyle}">
            <div class="input-group position-relative ses">
                <input type="text" class="form-control" v-model="seCon">
                <div class="input-group-append">
                    <button class="btn btn-success" type="button" @click="searchCon">Go</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "NavBars",
        data() {
            return {
                logSuccess: false,
                img: '',
                seStyle: false,
                i: 0,
                seCon: '',
                seInfo: {
                    shop: '',
                    shopping: ''
                }
            }
        },
        methods: {
            // 跳转首页
            indexPage() {
                this.$router.push('/')
            },
            // 跳转分类页
            classifyPage() {
                this.$router.push('/classify')
            },
            // 跳转组队页
            team() {
                this.$router.push('/team')
            },
            // 跳转商家页
            shopPage() {
                this.$router.push('/shopPage')
            },
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
            // 跳转商铺管理
            toShop() {
                this.$router.push('/backstage/shopManagement')
            },
            // 跳转商品管理
            toShopping() {
                this.$router.push('/backstage/shoppingManagement')
            },
            // 显示搜索
            showSe() {
                if (this.i % 2 === 0) {
                    this.seStyle = true
                    this.i++
                } else {
                    this.seStyle = false
                    this.i++
                }
            },
            // 搜索
            searchCon() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'get',
                        url: '/search/' + this.seCon
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    console.log(res.data)
                    if (res.data.commodities.length === 0 && res.data.shops.length === 0) {
                        this.seInfo.shop = -1
                    } else {
                        this.seInfo.shop = res.data.shops
                        this.seInfo.shopping = res.data.commodities
                    }
                    this.$bus.$emit('seInfo', this.seInfo)
                }).catch(err => {
                    console.log(err)
                })
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
            },
            toProFile() {
                this.$router.push('/proFile')
            }
        },
        mounted() {
            // 模拟传值，登陆成功
            // this.$refs.logSuccess.innerHTML = 'admin'
            // this.logSuccess = true

            const token = localStorage.getItem('token')
            if (token) {
                this.$refs.logSuccess.innerHTML = '欢迎：' + token
                this.img = 'https://static.runoob.com/images/mix/bird.jpg'
                this.logSuccess = true
            }
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

    .dropdown-menu {
        background-color: #007bff;
        border: none;
    }

    .se {
        left: 50%;
        height: 0;
        overflow: hidden;
        transform: translateX(-50%);
        transition: height ease 300ms;
    }

    .seStyle {
        height: 80px;
    }

    .ses {
        top: 50%;
        transform: translateY(-50%);
    }
</style>