<template>
    <div>
        <nav-bars/>
        <div>
            <div class="col-12 pt-3 pb-3 bg-light p">
                <div class="w-100 mb-3">
                    <div class="w-100 mb-3">
                        <p>自定义加入</p>
                        <hr>
                        <div class="w-100">
                            <form class="form-inline">
                                <label for="email">队伍编号:</label>
                                <input v-model="teamId" type="text" class="form-control" id="email">
                                <label for="pwd" class="ml-md-3">队长编号:</label>
                                <input v-model="usersId" type="text" class="form-control" id="pwd">
                                <button type="button" class="btn btn-primary btn-sm mt-md-0 mt-3 ml-md-3"
                                        @click="customJoin">加入队伍
                                </button>
                            </form>
                        </div>
                    </div>

                    <p>正在组队</p>
                    <hr>
                    <div class="w-100">
                        <!--                        商铺商品展示-->
                        <div class="table-responsive-md">
                            <table class="table table-hover text-secondary small">
                                <thead>
                                <tr class="text-center">
                                    <th>队伍名</th>
                                    <th>队伍信息</th>
                                    <th>最大人数</th>
                                    <th>已加入</th>
                                    <th>队长</th>
                                    <th>加入队伍</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="(list,index) in allTeam">
                                    <td>{{list.name}}</td>
                                    <td>{{list.content}}</td>
                                    <td>{{list.peopleNumber}}</td>
                                    <td>{{list.userDtoSet.length}}</td>
                                    <td>{{list.leader.username}}</td>
                                    <td>
                                        <button class="btn btn-sm btn-success" @click="joinTeam(index)">加入</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="w-100 mb-3">
                    <p>我的组队</p>
                    <hr>
                    <div class="w-100 mb-3 table-responsive-md">
                        <table class="table table-hover text-secondary small">
                            <thead>
                            <tr class="text-center">
                                <th>队伍名</th>
                                <th>队伍信息</th>
                                <th>最大人数</th>
                                <th>已加入</th>
                                <th>队长</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="(list,index) in myTeam">
                                <td>{{list.name}}</td>
                                <td>{{list.content}}</td>
                                <td>{{list.peopleNumber}}</td>
                                <td>{{list.userDtoSet.length}}</td>
                                <td>{{list.leader.username}}</td>
                                <td>
                                    <button class="btn btn-sm btn-success mr-1" @click="addTeam">新建</button>
                                    <button class="btn btn-sm btn-primary mr-1" @click="updTeam(index)">修改</button>
                                    <button class="btn btn-sm btn-warning mr-1" @click="exitTeam(index)">退出</button>
                                    <button class="btn btn-sm btn-danger" @click="destoryTeam(index)">解散</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <div v-show="dis">
                            <button class="btn btn-sm btn-success" @click="addTeam">新建</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--        修改弹框-->
        <div class="position-absolute add pt-3 pb-3 pl-5 pr-5 border bg-white col-10 col-md-4" v-show="upd">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloUpd">&times;</button>
            </div>
            <label for="name">队伍名：</label>
            <input id="name" type="text" class="form-control m-3" v-model="shop.names">
            <label for="des">最大人数：</label>
            <input id="des" type="text" class="form-control m-3" v-model="shop.star">
            <label for="d">队伍信息：</label>
            <input id="d" type="text" class="form-control m-3" v-model="shop.content">
            <div class="text-right">
                <button type="button" class="btn btn-success" @click="updSuccess">完成</button>
            </div>
        </div>
        <!--        新增弹框-->
        <div class="position-absolute updatePer pt-5 pb-5 pl-5 pr-5 border bg-white col-10 col-md-4"
             v-show="add">
            <div class="position-absolute clo text-right">
                <button class="btn btn-sm" @click="cloAdd">&times;</button>
            </div>
            <label for="nameA">队伍名：</label>
            <input id="nameA" type="text" class="form-control m-3" v-model="names">
            <label for="desA">队伍信息：</label>
            <input id="desA" type="text" class="form-control m-3" v-model="info">
            <label for="dA">最大人数：</label>
            <input id="dA" type="text" class="form-control m-3" v-model="maxNum">
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
        name: "Team",
        components: {ToTop, Foot, NavBars},
        data() {
            return {
                allTeam: [],
                myTeam: [],
                userId: 1,
                dis: false,
                upd: false,
                state: false,
                add: false,
                names: '',
                info: '',
                maxNum: '',
                shop: {
                    updId: '',
                    names: '',
                    star: '',
                    content: '',
                    used: '',
                    top: '',
                    blocked: ''
                },
                teamId: '',
                usersId: ''
            }
        },
        methods: {
            init() {
                // 查询所有队伍
                new Promise((resolve, reject) => {
                    request({
                        method: 'get',
                        url: '/team/findAllByUsing'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    this.allTeam = []
                    this.allTeam = res.data.teams
                }).catch(err => {
                    error('加载错误，请刷新重试。')
                })

                // 我的队伍
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {id: this.userId},
                        url: '/team/findAllByIdAndUsing'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    this.myTeam = ''
                    this.myTeam = res.data.teams
                })
            },
            // 自定义加入
            customJoin() {
                if (this.teamId && this.usersId) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                tid: this.teamId,
                                uid: this.usersId
                            },
                            url: '/team/success'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        console.log(res.data)
                        if (res.data.res === 'ok') {
                            success('加入成功。')
                            this.init()
                        } else if (res.data.res === '该用户没有组队记录！') {
                            tip('找不到队伍或队长。')
                        } else {
                            error('加载错误，请刷新重试。')
                        }
                    })
                } else {
                    tip('输入有误，请重试。')
                }
            },
            // 加入全部中的队伍
            joinTeam(index) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {
                            tid: this.allTeam[index].id,
                            uid: this.userId
                        },
                        url: '/team/joinTeam'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    if (res.data.res === '加入成功！') {
                        success('加入成功。')
                        this.init()
                    } else if (res.data.res === '已在队伍中！') {
                        tip('您已在队伍中，无需重复加入。')
                    } else {
                        error('加载错误，请刷新重试。')
                    }
                })
            },
            // 修改我的队伍开启
            updTeam(index) {
                this.upd = true
                this.shop.updId = this.myTeam[index].id
                this.shop.names = this.myTeam[index].name
                this.shop.star = this.myTeam[index].peopleNumber
                this.shop.content = this.myTeam[index].content
            },
            // 关闭修改商品弹窗
            cloUpd() {
                this.upd = false
            },
            // 修改队伍信息
            updSuccess() {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {
                            uid: this.userId,
                            tid: this.shop.updId,
                            name: this.shop.names,
                            peopleNumber: this.shop.peopleNumber,
                            content: this.shop.content
                        },
                        url: '/team/changeTeam'
                    }).then(res => {
                        resolve(res)
                    })
                }).then(res => {
                    console.log(res.data)
                    if (res.data.res === 'ok') {
                        success()
                        this.init()
                    } else {
                        error()
                    }
                })
                this.upd = false
            },

            // 退出队伍
            exitTeam(id) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {
                            tid: this.myTeam[id].id,
                            uid: this.userId
                        },
                        url: '/team/outTeam'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === '退出成功！') {
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
            // 解散队伍
            destoryTeam(id) {
                new Promise((resolve, reject) => {
                    request({
                        method: 'post',
                        params: {
                            tid: this.myTeam[id].id,
                            uid: this.userId
                        },
                        url: '/team/dissolution'
                    }).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    })
                }).then(res => {
                    if (res.data.res === 'ok') {
                        success()
                        this.init()
                    } else if (res.data.res === '非队长，无法操作！') {
                        tip('非队长，无法操作！')
                    } else {
                        error()
                    }
                }).catch(err => {
                    console.log(err)
                    error()
                })
            },
            // 新增商品弹窗
            addTeam() {
                this.add = true
            },
            // 关闭新增商品弹窗
            cloAdd() {
                this.add = false
            },
            // 新增队伍成功
            addSuccess() {
                if (this.names && this.info && this.maxNum) {
                    new Promise((resolve, reject) => {
                        request({
                            method: 'post',
                            params: {
                                uid: this.userId,
                                name: this.names,
                                content: this.info,
                                peopleNumber: this.maxNum
                            },
                            url: '/team/setUpTeam'
                        }).then(res => {
                            resolve(res)
                        })
                    }).then(res => {
                        if (res.data === '') {
                            success()
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