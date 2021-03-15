<template>
    <div>
        <nav-bars/>
        <!--        商铺页-->
        <div>
            <div class="col-12 pt-3 pb-3 bg-light p">
                <div class="w-100 mb-3">
                    <div class="w-100">
                        <!--                        商铺商品展示-->
                        <div class="table-responsive-md">
                            <table class="table table-hover text-secondary small">
                                <thead>
                                <tr class="text-center">
                                    <th>id</th>
                                    <th>品名</th>
                                    <th>星级</th>
                                    <th>是否使用</th>
                                    <th>是否锁定</th>
                                    <th>是否置顶</th>
                                    <th>商品操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="(list,index) in allInfo">
                                    <td>{{list.id}}</td>
                                    <td>{{list.name}}</td>
                                    <td>{{list.star}}</td>
                                    <td>{{list.used}}</td>
                                    <td>{{list.blocked}}</td>
                                    <td>{{list.top}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-primary mr-1" @click="updShop(index)">星级</button>
                                        <button class="btn btn-sm btn-warning mr-1"
                                                @click="stateShop(index)">状态
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--        修改星级弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4" v-show="upd">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloUpd">&times;</button>
            </div>
            <label for="name">品名：</label>
            <input id="name" type="text" class="form-control m-3" v-model="shop.names">
            <label for="des">星级：</label>
            <input id="des" type="text" class="form-control m-3" v-model="shop.star">
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="updSuccess">完成</button>
            </div>
        </div>
        <!--        状态弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4"
             v-show="state">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloState">&times;</button>
            </div>
            <label class="form-check m-3">是否使用
                <input type="checkbox" class="form-check-inline" v-model="shop.used">
            </label>
            <label class="form-check m-3">是否置顶
                <input type="checkbox" class="form-check-inline" v-model="shop.top">
            </label>
            <label class="form-check m-3">是否锁定
                <input type="checkbox" class="form-check-inline" v-model="shop.blocked">
            </label>
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="stateSuccess">完成</button>
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
    import {error, success, tip} from "../util/promptBox";

    export default {
        name: 'ShoppingManagement',
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                allInfo: [],
                shopInfo: '',
                updInfo: '修改',
                switch: true,
                shopId: 11,
                upd: false,
                state: false,
                add: false,
                names: '',
                star: '',
                price: '',
                content: '',
                shop: {
                    names: '',
                    star: '',
                    price: '',
                    content: '',
                    used: '',
                    top: '',
                    blocked: ''
                },
            }
        },
        methods: {
            init() {
                // 查询所有商品
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
                    if (res.data.res === 'ok') {
                        this.allInfo = []
                        this.allInfo = res.data.commodityDtoSet
                    } else if (res.data.res === '没有商品！') {
                        tip('暂无商品。')
                    }
                }).catch(err => {
                    error('加载错误，请刷新重试。')
                })
            },
            // 修改商品弹窗开启
            updShop(id) {
                this.upd = true
                this.updId = this.allInfo[id].id
                this.shop.names = this.allInfo[id].name
                this.shop.star = this.allInfo[id].star
                this.shop.price = this.allInfo[id].price
                this.shop.content = this.allInfo[id].content
            },
            // 关闭修改商品弹窗
            cloUpd() {
                this.upd = false
            },
            // 修改商品信息
            updSuccess() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({
                            id: this.updId,
                            name: this.shop.names,
                            star: this.shop.star,
                            price: this.shop.price,
                            content: this.shop.content
                        }),
                        url: '/commodity/changeCommodity'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        this.init()
                    } else {
                        error()
                    }
                })
                this.upd = false
            },

            // 商品状态弹窗开启
            stateShop(id) {
                this.state = true
                this.updId = this.allInfo[id].id
                this.shop.used = this.allInfo[id].used
                this.shop.top = this.allInfo[id].top
                this.shop.blocked = this.allInfo[id].blocked
            },
            // 关闭商品状态弹窗
            cloState() {
                this.state = false
            },
            // 修改商品状态信息
            stateSuccess() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {
                            cid: this.updId,
                            isUsed: this.shop.used,
                            isTop: this.shop.top,
                            isBlocked: this.shop.blocked
                        },
                        url: '/commodity/changeState'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        this.init()
                    } else {
                        error()
                    }
                })
                this.state = false
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .p div p {
        font-size: 17px;
        font-family: 幼圆, serif;
        color: #6c757d;
    }

    .p div p:hover {
        cursor: default;
        color: #dc3545;
    }

    .updatePer {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
        border-radius: 5px;
    }

    .clo {
        top: 0;
        right: 0;
    }

    .add {
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        border-radius: 5px;
    }

    th, td {
        white-space: nowrap;
    }

    .input {
        border: none;
        outline: none;
        background-color: rgba(255, 255, 255, 0);
    }
</style>