<template>
    <div>
        <!--        导航栏-->
        <nav-bars/>
        <!--        分类信息-->
        <div class="row no-gutters">
            <!--            口风琴菜单-->
            <accordion/>
            <!--            右侧详情-->
            <div class="col-9 col-md-10">
                <div class="row no-gutters">
                    <div v-show="shopping" class="col-6 col-md-2 p-3 con" v-for="(list,index) in allShopping">
                        <div @click="detailShopping">
                            <img src="../assets/shopping.jpg" width="100%" height="100%">
                        </div>
                        <div>
                            <span class="float-left name" @click="detailShopping">{{list.name}}</span>
                            <span class="text-right float-right small text-secondary">
                                <i class="fa fa-cny text-danger"></i>
                                {{list.price}}
                            </span>
                        </div>
                        <div class="small text-secondary content" @click="detailShopping">{{list.content}}</div>
                    </div>

                    <div v-show="shop" class="col-6 col-md-2 p-3 con" v-for="(list,index) in allShop">
                        <div @click="detailShop(index)">
                            <img src="../assets/shop.jpg" width="100%" height="100%">
                        </div>
                        <div>
                            <span class="float-left name" @click="detailShop(index)">{{list.name}}</span>
                            <span class="text-right float-right small text-secondary">
                                <i class="bi-star-fill text-warning small"></i>
                                {{list.star}}
                            </span>
                        </div>
                        <div class="small text-secondary content" @click="detailShop(index)">{{list.content}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBars from "../components/NavBars";
    import Accordion from "../components/Accordion";
    import {request} from "../network/request";
    import {error} from "../util/promptBox";
    import {mapMutations} from "vuex";

    export default {
        name: "Classify",
        components: {
            NavBars,
            Accordion
        },
        data() {
            return {
                allShopping: [],
                allShop: [],
                shopping: true,
                shop: false,

            }
        },
        methods: {
            ...mapMutations(['changeComment']),
            // 分类页默认加载全部商品
            init() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'get',
                        url: '/commodity/getAllCommodity'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    // console.log(res.data)
                    if (res.data.res === 'ok') {
                        this.allShopping = []
                        this.allShopping = res.data.commodityDtoSet
                    } else {
                        error('加载错误，请刷新重试。')
                    }
                }).catch(err => {
                    error('加载错误，请刷新重试。')
                })
            },
            // 商品详情页
            detailShopping() {
                // new Promise((resolve, reject) => {
                //     request({
                //         method: 'get',
                //         url: '/commodity/getAllCommodity'
                //     }).then(res => {
                //         resolve(res)
                //     }).catch(err => {
                //         reject(err)
                //     })
                // }).then(res => {
                //     console.log(res.data)
                // if (res.data.res === 'ok') {
                //     this.allInfo = []
                //     this.allInfo = res.data.shops
                // } else {
                //     error('加载错误，请刷新重试。')
                // }
                // }).catch(err => {
                //     error('加载错误，请刷新重试。')
                // })
            },
            // 商品详情页
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
            this.init()
            this.$bus.$on('sign', data => {
                if (data === 'shop') {
                    this.shopping = false
                    this.shop = true
                    new Promise((resolve, reject) => {
                        request({
                            method: 'get',
                            url: '/shop/findAll'
                        }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err)
                        })
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.res === 'ok') {
                            this.allShop = []
                            this.allShop = res.data.shops
                        } else {
                            error('加载错误，请刷新重试。')
                        }
                    }).catch(err => {
                        error('加载错误，请刷新重试。')
                    })
                } else if (data === 'shopping') {
                    this.shop = false
                    this.shopping = true
                    this.init()
                }
            })
        }

    }
</script>

<style scoped>
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