<template>
    <div>
        <nav-bars/>
        <div class="row no-gutters bg">
            <!--商铺背景图-->
            <div id="demo" class="carousel slide col-12 mt-md-3 pr-md-3 col-md-5 offset-md-1 carouselPhoto"
                 data-ride="carousel">

                <!-- 指示符 -->
                <ul class="carousel-indicators">
                    <li data-target="#demo" data-slide-to="0" class="active"></li>
                    <li data-target="#demo" data-slide-to="1"></li>
                    <li data-target="#demo" data-slide-to="2"></li>
                </ul>

                <!-- 轮播图片 -->
                <div class="carousel-inner">
                    <div class="carousel-item active carouselPhoto">
                        <img src="../assets/shop.jpg" alt="">
                    </div>
                    <div class="carousel-item carouselPhoto">
                        <img src="../assets/shop.jpg" alt="">
                    </div>
                    <div class="carousel-item carouselPhoto">
                        <img src="../assets/shop.jpg" alt="">
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

            <!--            商铺信息-->
            <div class="col-12 col-md-5 mt-3 position-relative bg-light shadow-sm" style="min-height: 200px">
                <div class="m-3 row">
                    <h5 class="col-10">{{shop.name}}</h5>
                    <h5 class="col-2"><small><i class="bi-star-fill text-warning"></i>{{shop.star}}</small></h5>
                </div>
                <div class="col-12">{{shop.content}}</div>
                <!--            操作-->
                <div class="m-3 col-10 row position-absolute" style="bottom: 0">
                    <div class="col-6">组队情况
                        <button class="btn btn-sm btn-outline-primary"><i class="bi-people-fill"></i></button>
                    </div>
                    <div class="col-6 text-right">去这儿
                        <button class="btn btn-sm btn-outline-success"><i class="bi-geo-alt-fill"></i></button>
                    </div>
                </div>
            </div>
            <!--模型-->
            <div class="clo-12 col-md-10 offset-md-1 mt-3 shadow-sm bg-light" style="height: 200px">
                <div class="ml-3 mt-3 effect"><i class="bi-border-outer"></i> 店铺布局</div>
                <hr>
                <div class="h3 text-secondary text-center">正在施工中，请关注2.0版本</div>
            </div>
            
            <div class="clo-12 col-md-10 offset-md-1 mt-3 bg-light shadow-sm">
                <div class="ml-3 mt-3 effect"><i class="bi-chat-square-text"></i> 店铺评论</div>
                <hr>
                <comment/>
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
    import Comment from "../components/Comment";

    export default {
        name: "ShopDetail",
        components: {Comment, ToTop, Foot, NavBars},
        data() {
            return {
                shopId: '',
                shop: {
                    name: '',
                    star: '',
                    content: ''
                }
            }
        },
        methods: {
            init() {
                // 查询本店信息
                if (this.shopId) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                sid: this.shopId
                            },
                            url: '/shop/findById'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        // console.log(res.data.shop)
                        this.shop.name = res.data.shop.name
                        this.shop.star = res.data.shop.star
                        this.shop.content = res.data.shop.content
                    })
                }
            }
        },
        mounted() {
            this.shopId = this.$route.query.shopId
            this.init()
        }
    }
</script>

<style scoped>
    .carousel-item img {
        width: 100%;
        height: 100%;
    }

    .carouselPhoto {
        height: 350px;
        overflow: hidden;
    }

    .effect:hover {
        cursor: pointer;
        color: #dc3545;
    }
    .bg div{
        /*background-color: rgb(240,240,240);*/
    }
</style>