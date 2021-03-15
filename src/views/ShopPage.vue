<template>
    <div>
        <nav-bars/>
        <!--        商铺页-->
        <div>
            <div class="col-12 pt-3 pb-3 bg-light p">
                <div class="w-100 mb-3">
                    <p><i class="bi bi-shop-window text-danger"></i>我的商品</p>
                    <hr>
                    <div class="w-100">
                        <!--                        商铺商品展示-->
                        <div class="table-responsive-md">
                            <table class="table table-hover text-secondary small">
                                <thead>
                                <tr class="text-center">
                                    <th>id</th>
                                    <th>品名</th>
                                    <th>星级</th>
                                    <th>售价</th>
                                    <th>描述</th>
                                    <th>添加日期</th>
                                    <!--                                    <th>是否使用</th>-->
                                    <!--                                    <th>是否锁定</th>-->
                                    <!--                                    <th>是否置顶</th>-->
                                    <th>商品操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="(list,index) in allInfo">
                                    <td>{{list.id}}</td>
                                    <td>{{list.name}}</td>
                                    <td>{{list.star}}</td>
                                    <td>{{list.price}}</td>
                                    <td>{{list.content}}</td>
                                    <td>{{list.createTime}}</td>
                                    <!--                                    <td>{{list.isUsed}}</td>-->
                                    <!--                                    <td>{{list.isBlocked}}</td>-->
                                    <!--                                    <td>{{list.isTop}}</td>-->
                                    <td>
                                        <button class="btn btn-sm btn-primary mr-1" @click="updShop(index)">修改</button>
                                        <button v-show="false" class="btn btn-sm btn-warning mr-1"
                                                @click="stateShop(index)">状态
                                        </button>
                                        <button class="btn btn-sm btn-danger mr-1" @click="delShop(index)">删除</button>
                                        <button class="btn btn-sm btn-success" @click="addShop">新建</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div ref="dis">
                                <button class="btn btn-sm btn-success" @click="addShop">新建</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-100 mb-3">
                    <p><i class="bi bi-grid-fill text-danger"></i>店铺模型</p>
                    <hr>
                    <div class="h3 text-secondary text-center">正在施工中，请关注2.0版本</div>
                </div>

                <div class="w-100 mb-3">
                    <p><i class="bi bi-info-circle text-danger"></i>店铺信息</p>
                    <hr>
                    <div class="w-100 mb-3 table-responsive-md">
                        <table class="table table-hover text-secondary small">
                            <thead>
                            <tr>
                                <td>店铺名</td>
                                <td>店铺描述</td>
                                <td>星级</td>
                                <td>操作</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><input class="input" ref="updName" type="text" v-model="shopInfo.name" disabled>
                                </td>
                                <td><input class="input" ref="updContent" type="text" v-model="shopInfo.content"
                                           disabled></td>
                                <td><input class="input" type="text" v-model="shopInfo.star" disabled></td>
                                <td>
                                    <button class="btn btn-sm btn-primary" @click="updShopInfo">{{updInfo}}</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="w-100">
                    <p><i class="bi bi-lightbulb text-danger"></i>店铺状态</p>
                    <hr>
                    <div class="w-100">
                        <table class="table table-hover text-secondary small">
                            <thead>
                            <tr>
                                <td>使用情况</td>
                                <td>被置顶</td>
                                <td>被锁定</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{{shopInfo.used}}</td>
                                <td>{{shopInfo.top}}</td>
                                <td>{{shopInfo.blocked}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--        修改弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4" v-show="upd">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloUpd">&times;</button>
            </div>
            <label for="name">品名：</label>
            <input id="name" type="text" class="form-control m-3" v-model="shop.names">
            <label for="des">售价：</label>
            <input id="des" type="text" class="form-control m-3" v-model="shop.star">
            <label for="d">商品描述：</label>
            <input id="d" type="text" class="form-control m-3" v-model="shop.content">
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
        <!--        新增弹框-->
        <div class="position-absolute updatePer pt-5 pb-5 pl-5 pr-5 border bg-white col-10 col-md-4"
             v-show="add">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloAdd">&times;</button>
            </div>
            <label for="nameA">品名：</label>
            <input id="nameA" type="text" class="form-control m-3" v-model="names">
            <label for="desA">售价：</label>
            <input id="desA" type="text" class="form-control m-3" v-model="price">
            <label for="dA">商品描述：</label>
            <input id="dA" type="text" class="form-control m-3" v-model="content">
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="addSuccess">完成</button>
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
        name: "shopPage",
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
                    content: '',
                    used: '',
                    top: '',
                    blocked: ''
                },
            }
        },
        methods: {
            init() {
                // 查询本店所有商品
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {sid: this.shopId},
                        url: '/commodity/getAllCommodityByShop'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        this.$refs.dis.style.display = 'none'
                        this.allInfo = []
                        this.allInfo = res.data.commodityDtoSet
                    } else if (res.data.res === '没有商品！') {
                        tip('店铺暂无商品。')
                    }
                }).catch(err => {
                    error('加载错误，请刷新重试。')
                })

                // 店铺信息
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {sid: this.shopId},
                        url: '/shop/findById'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        this.shopInfo = ''
                        this.shopInfo = res.data.shop
                    } else {
                        error('加载错误，请刷新重试。')
                    }
                })
            },
            // 修改商品弹窗开启
            updShop(id) {
                this.upd = true
                this.updId = this.allInfo[id].id
                this.shop.names = this.allInfo[id].name
                this.shop.star = this.allInfo[id].price
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
                            star: 0,
                            price: this.shop.star,
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
                            sid: this.updId,
                            used: this.shop.used,
                            top: this.shop.top,
                            blocked: this.shop.blocked
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
            },
            // 删除商品
            delShop(id) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {cid: this.allInfo[id].id},
                        url: '/commodity/delCommodity'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    // console.log(this.allInfo[id].id)
                    // console.log(res.data)
                    // if (res.data.res === 'ok') {
                    success()
                    this.init()
                    // } else {
                    //     error()
                    // }
                }).catch(err => {
                    // console.log(err)
                    // error()
                    success()
                    this.init()
                })
            },
            // 新增商品弹窗
            addShop() {
                this.add = true
            },
            // 关闭新增商品弹窗
            cloAdd() {
                this.add = false
            },
            // 新增商品成功
            addSuccess() {
                if (this.names && this.price && this.content) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                "sid": this.shopId,
                                "commodityDto": {
                                    "name": this.names,
                                    "star": "0",
                                    "price": this.price,
                                    "content": this.content
                                }
                            }),
                            url: '/commodity/addCommodity'
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
                }
                this.add = false
            },
            // 商户修改自己的店铺信息
            updShopInfo() {
                if (this.switch === true) {
                    this.$refs.updName.removeAttribute('disabled')
                    this.$refs.updContent.removeAttribute('disabled')
                    this.updInfo = '完成'
                    this.switch = !this.switch
                } else {
                    this.switch = !this.switch
                    this.$refs.updName.setAttribute('disabled', 'true')
                    this.$refs.updContent.setAttribute('disabled', 'true')
                    this.updInfo = '修改'
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                id: this.shopId,
                                name: this.shopInfo.name,
                                star: this.shopInfo.star,
                                content: this.shopInfo.content
                            }),
                            url: '/shop/changeSimple'
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
                }
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