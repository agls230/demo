<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <div class="">
            <div>
                <div id="demo" class="carousel slide col-12 mt-3 mb-3 carouselPhoto" data-ride="carousel">

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
        <h5 ref="tip" class="text-danger m-3"></h5>
        <div class="mb-3 shadow">
            <h5 ref="shopText"></h5>
            <hr>
            <div class="row no-gutters">
                <div class="col-3 col-md-1 m-3 con" v-for="(list,index) in allShop">
                    <div @click="detailShop(index)">
                        <img src="../assets/shop.jpg" width="100%" height="100%">
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

        <div class="shadow mb-3">
            <h5 ref="shoppingText"></h5>
            <hr>
            <div class="row no-gutters">
                <div class="col-3 col-md-1 m-3 con" v-for="(list,index) in allShopping">
                    <div @click="detailShopping(index)">
                        <img src="../assets/shopping.jpg" width="100%" height="100%">
                    </div>
                    <div class="d-inline-block w-75 name" @click="detailShopping(index)">{{list.name}}</div>
                    <div class="text-right d-inline-block small w-25 text-secondary">
                        <i class="bi-star-fill text-warning small"></i>
                        {{list.price}}
                    </div>
                    <div class="small text-secondary content" @click="detailShopping(index)">{{list.content}}</div>
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
                allShopping: []
            }
        },
        methods: {
            ...mapMutations(['changeComment']),
            // 跳转到商店详情页
            detailShop(index) {
                this.$router.push({
                    path: '/shopDetail',
                    query: {shopId: this.allShop[index].id}
                })
                const _this = this
                _this.changeComment({id: this.allShop[index].id, type: 'shop'})
            }
        },
        mounted() {
            this.$refs.shopText.innerHTML = '推荐店铺'
            this.$refs.shoppingText.innerHTML = '推荐店品'
            // 商铺
            new Promise((resolve, reject) => {
                request({
                    method: 'get',
                    url: '/shop/findAll'
                }).then(res => {
                    resolve(res)
                })
            }).then(res => {
                this.allShop = []
                this.allShop = res.data.shops
            })

            new Promise((resolve, reject) => {
                request({
                    method: 'post',
                    url: '/commodity/getAllCommodityAndControl'
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            }).then(res => {
                this.allShopping = []
                this.allShopping = res.data.commodityDtoSet
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

    .con div {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .name:hover, .content:hover {
        text-decoration: underline;
        cursor: pointer;
    }
</style>