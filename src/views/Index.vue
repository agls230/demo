<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <div class="">
            <div>
                <div id="demo" class="carousel slide w-100 carouselPhoto" data-ride="carousel">

                    <!-- 指示符 -->
                    <ul class="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>

                    <!-- 轮播图片 -->
                    <div class="carousel-inner">
                        <div class="carousel-item active carouselPhoto">
                            <img src="../assets/photo1.png" alt="">
                        </div>
                        <div class="carousel-item carouselPhoto">
                            <img src="../assets/photo2.png" alt="">
                        </div>
                        <div class="carousel-item carouselPhoto">
                            <img src="https://static.runoob.com/images/mix/img_mountains_wide.jpg" alt="">
                        </div>
                    </div>

                    <!-- 左右切换按钮 -->
                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </a>
                    <a class="carousel-control-next" href="#demo" data-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </a>

                </div>
            </div>
        </div>

        <div class="shadow mb-3">
            <h5 ref="shoppingText" class="bg-primary p-3"></h5>
            <hr>
            <div class="row no-gutters">
                <div class="col-5 col-md-2 m-3 con shadow" v-for="(list,index) in allShopping">
                    <div class="small name text-secondary" @click="detailShopping(index)"><i
                            class="bi-person-plus-fill"></i>发起者：{{list.leader.username}}
                    </div>
                    <div class="name text-secondary" @click="detailShopping(index)"><i
                            class="bi-calendar2-event"></i>活动：{{list.name}}
                    </div>
                    <div class="text-secondary content" @click="detailShopping(index)"><i
                            class="bi-people-fill"></i>最大人数：{{list.peopleNumber}}
                    </div>
                    <div class="text-secondary content" @click="detailShopping(index)"><i
                            class="bi-chat-right-dots"></i>详情：{{list.content}}
                    </div>
                </div>
                <div v-show="team" class="h5 text-secondary" style="height: 190px;line-height: 190px;margin: 0 auto">
                    暂无正在组建的队伍。
                </div>
            </div>
        </div>
        <h5 ref="tip" class="text-danger m-3"></h5>
        <div class="mb-3 shadow">
            <h5 ref="shopText" class="bg-primary p-3"></h5>
            <hr>
            <div class="row no-gutters">
                <div class="col-3 col-md-1 m-3 con shadow" v-for="(list,index) in allShop">
                    <div style="overflow: hidden;width: auto;height: auto" @click="detailShop(index)">
                        <img style="border-radius: 10px" alt="" :src=imgUrl[index] width="100%" height="100%">
                    </div>
                    <div class="d-inline-block w-75 name" @click="detailShop(index)">{{list.name}}</div>
                    <div class="text-right d-inline-block small w-25 text-secondary">
                        <i class="bi-star-fill text-warning small"></i>
                        {{list.star}}
                    </div>
                    <div class="small text-secondary content" @click="detailShop(index)">{{list.content}}</div>
                </div>
            </div>
        </div>

        <!--        底部-->
        <foot/>
        <!--        返回顶部按钮-->
        <to-top/>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";
    import {request} from "../network/request";
    import {mapMutations} from "vuex";

    export default {
        name: "Index",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                allShop: [],
                allShopping: [],
                team: false,
                imgUrl: [
                    require("../assets/photo/1.jpeg"),
                    require('../assets/photo/2.webp'),
                    require('../assets/photo/3.webp'),
                    require('../assets/photo/4.webp'),
                    require('../assets/photo/5.webp'),
                    require('../assets/photo/6.webp')
                ]
            }
        },
        methods: {
            ...mapMutations(['changeComment', 'changeShopId']),
            // 跳转到商店详情页
            detailShop(index) {
                const _this = this
                _this.changeComment({id: this.allShop[index].id, type: 'shop'})
                _this.changeShopId(this.allShop[index].id)
                this.$router.push({
                    path: '/shopDetail',
                    query: {shopId: this.allShop[index].id}
                })
            },
            // 跳转到商店详情页
            detailShopping(index) {
                this.$router.push({
                    path: '/team',
                    // query: {shopId: this.allShop[index].id}
                })
            }
        },
        mounted() {
            this.$refs.shopText.innerHTML = '推荐店铺'
            this.$refs.shoppingText.innerHTML = '当前组队'
            // 商铺
            new Promise((resolve, reject) => {
                request({
                    method: 'get',
                    url: '/shop/findAll'
                }).then(res => {
                    resolve(res)
                })
            }).then(res => {
                console.log(res)
                this.allShop = []
                this.allShop = res.data.shops
            })
            // 组队
            new Promise((resolve, reject) => {
                request({
                    method: 'get',
                    url: '/team/findAllByUsing'
                }).then(res => {
                    resolve(res)
                })
            }).then(res => {
                console.log(res.data.teams)
                if (res.data.teams.length === 0) {
                    this.allShopping = []
                    this.team = true
                } else {
                    this.allShopping = []
                    this.allShopping = res.data.teams
                }
            })
            this.$bus.$on('seInfo', data => {
                if (data.shop === -1) {
                    this.$refs.tip.innerHTML = '搜索到如下信息：'
                    this.$refs.shopText.innerHTML = '搜索店铺'
                    this.$refs.shoppingText.innerHTML = '搜索商品'
                    this.allShop = []
                    this.allShopping = []
                } else {
                    this.$refs.tip.innerHTML = '搜索到如下信息：'
                    this.$refs.shopText.innerHTML = '搜索店铺'
                    this.$refs.shoppingText.innerHTML = '搜索商品'
                    this.allShop = []
                    this.allShopping = []
                    this.allShop = data.shop
                    this.allShopping = data.shopping
                }
                // console.log(data.shop)
            })
        }
    }
</script>

<style scoped>
    .carousel-item img {
        width: 100%;
        height: 100%;
    }

    .carouselPhoto {
        height: 200px;
        overflow: hidden;
    }

    .con {
        border-radius: 10px;
        padding: 6px;
        background-color: #F0F8FF;
    }

    .con div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .con:hover {
        transform: scale(1.1);
        transition: all 0.3s;
        background-color: lightskyblue;
    }

    .name:hover, .content:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>