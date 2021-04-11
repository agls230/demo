<template>
    <div>
        <nav-bars/>
        <div class="table-responsive-md">
            <table class="table table-hover text-secondary small">
                <thead>
                <tr class="text-center">
                    <th>id</th>
                    <th>商铺名</th>
                    <th>星级</th>
                    <th>描述</th>
                    <th>是否使用</th>
                    <th>是否置顶</th>
                    <th>是否锁定</th>
                    <th>创建时间</th>
                    <th>店铺操作</th>
                </tr>
                </thead>
                <tbody>
                <tr class="text-center" v-for="(list,index) in allInfo">
                    <td>{{list.id}}</td>
                    <td>{{list.name}}</td>
                    <td>{{list.star}}</td>
                    <td>{{list.content}}</td>
                    <td>{{list.used}}</td>
                    <td>{{list.top}}</td>
                    <td>{{list.blocked}}</td>
                    <td>{{list.createTime}}</td>
                    <td>
                        <button class="btn btn-sm btn-primary mr-1" @click="updShop(index)">修改</button>
                        <button class="btn btn-sm btn-warning mr-1" @click="stateShop(index)">状态</button>
                        <button class="btn btn-sm btn-danger mr-1" @click="delShop(index)">删除</button>
                        <button class="btn btn-sm btn-success" @click="addShop">新建</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div v-show="firstShop">
            <button class="btn btn-sm btn-primary mb-3 col-12 col-md-1" @click="addFirstShop">新增商铺</button>
        </div>
        <!--        修改弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4" v-show="upd">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloUpd">&times;</button>
            </div>
            <label for="name">商铺名：</label>
            <input id="name" type="text" class="form-control m-3" v-model="shop.names">
            <label for="des">星级：</label>
            <input id="des" type="text" class="form-control m-3" v-model="shop.star">
            <label for="d">商铺描述：</label>
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
            <label for="nameA">商铺名：</label>
            <input id="nameA" type="text" class="form-control m-3" v-model="names">
            <label for="desA">星级：</label>
            <input id="desA" type="text" class="form-control m-3" v-model="star">
            <label for="dA">商铺描述：</label>
            <input id="dA" type="text" class="form-control m-3" v-model="content">
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="addSuccess">完成</button>
            </div>
        </div>
        <!--        <foot class="foot"></foot>-->
        <to-top/>
    </div>
</template>

<script>
    import {request} from "../network/request";
    import NavBars from "../components/NavBars";
    import Foot from "../components/Foot";
    import ToTop from "../components/ToTop";
    import {error, success} from "../util/promptBox";

    export default {
        name: "ShopManagement",
        data() {
            return {
                allInfo: [],
                updId: '',
                shop: {
                    names: '',
                    star: '',
                    content: '',
                    used: '',
                    top: '',
                    blocked: ''
                },
                upd: false,
                state: false,
                add: false,
                names: '',
                star: '',
                content: '',
                firstShop: false
            }
        },
        components: {
            ToTop,
            Foot,
            NavBars,
        },
        methods: {
            // 页面初始化显示所有商铺
            init() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'get',
                        url: '/shop/findAll'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    // console.log(res.data)
                    if (res.data.res === '没有店铺') {
                        this.firstShop = true
                    } else {
                        this.allInfo = []
                        this.allInfo = res.data.shops
                    }
                })
            },
            // 修改商铺弹窗开启
            updShop(id) {
                this.upd = true
                this.updId = this.allInfo[id].id
                this.shop.names = this.allInfo[id].name
                this.shop.star = this.allInfo[id].star
                this.shop.content = this.allInfo[id].content
            },
            // 关闭修改商铺弹窗
            cloUpd() {
                this.upd = false
            },
            // 修改商铺信息
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
                            content: this.shop.content
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
                this.upd = false
            },

            // 商铺状态弹窗开启
            stateShop(id) {
                this.state = true
                this.updId = this.allInfo[id].id
                this.shop.used = this.allInfo[id].used
                this.shop.top = this.allInfo[id].top
                this.shop.blocked = this.allInfo[id].blocked
            },
            // 关闭商铺状态弹窗
            cloState() {
                this.state = false
            },
            // 修改商铺状态信息
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
                        url: '/shop/changeState'
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
            // 删除商铺
            delShop(id) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {sid: this.allInfo[id].id},
                        url: '/shop/delete'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        this.init()
                    } else {
                        error()
                    }
                }).catch(err => {
                    console.log(err)
                    error()
                })
            },
            // 新增商铺弹窗
            addShop() {
                this.add = true
                this.names = ''
                this.star = ''
                this.content = ''
            },
            addFirstShop() {
                this.add = true
                this.names = ''
                this.star = ''
                this.content = ''
            },
            // 关闭新增商铺弹窗
            cloAdd() {
                this.add = false
            },
            // 新增成功
            addSuccess() {
                if (this.names && this.star && this.content) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: JSON.stringify({
                                name: this.names,
                                star: this.star,
                                content: this.content,
                                // 此商铺对应的用户的id，暂时由管理员赋值
                                uid: 4
                            }),
                            url: '/shop/create'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        if (res.data.res === 'ok') {
                            success()
                            this.firstShop = false
                            this.init()
                        } else {
                            error()
                        }
                    })
                }
                this.add = false
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
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

    .isShow {
        display: none;
    }

    .updateP {
        display: none;
    }

    th, td {
        white-space: nowrap;
    }
</style>